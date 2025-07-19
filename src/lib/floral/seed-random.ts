/*
Copyright 2019 David Bau.
Copyright 2025 Jakka Prihatna.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

//
// The following constants are related to IEEE 754 limits.
//
const WIDTH    = 256;                     // each RC4 output is 0 <= x < 256
const CHUNKS   = 6;                       // at least six RC4 outputs for each double
const DIGITS   = 52;                      // there are 52 significant digits in a double
const DENOM    = Math.pow(WIDTH, CHUNKS);
const SIGN     = Math.pow(2, DIGITS);
const OVERFLOW = SIGN * 2;
const MASK     = WIDTH - 1;

interface ARC4Type {
  S: number[];
  i: number;
  j: number;
}

interface RNG { random: () => number };
interface PRNG {
  (): number;
  int32(): number;
  quick(): number;
  double: PRNG;
  state?: <T extends ARC4Type>() => T
};

type SeedRandomCallback = <T extends ARC4Type, R = unknown>(prng: PRNG, seed: string, state: boolean | T) => R;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
class ARC4 implements ARC4Type {
  S: number[];
  i: number;
  j: number;

  constructor(key) {
    var t, keylen = key.length;
    let i = 0, j = this.i = this.j = 0;
    let s: number[] = this.S = [];

    // The empty key [] is treated as [0].
    if (!keylen) { key = [keylen++]; }

    // Set up S using the standard key scheduling algorithm.
    while (i < WIDTH) {
      s[i] = i++;
    }
    for (i = 0; i < WIDTH; i++) {
      s[i] = s[j = MASK & (j + key[i % keylen] + (t = s[i]))];
      s[j] = t;
    }

    this.g(WIDTH);
  }

    // The "g" method returns the next (count) outputs as one number.
  g(count: number) {
    // Using instance members instead of closure state nearly doubles speed.
    let t, r = 0, i = this.i, j = this.j, s = this.S;

    while (count--) {
      t = s[i = MASK & (i + 1)];
      r = r * WIDTH + s[MASK & ((s[i] = s[j = MASK & (j + t)]) + (s[j] = t))];
    }

    this.i = i;
    this.j = j;

    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  };
}

interface SeedRandomOptions {
  readonly entropy?: boolean
  readonly state?: boolean | ARC4Type
  readonly pass?: SeedRandomCallback
}

class SeedRandom {
  readonly pool: number[];
  readonly math: RNG;

  constructor(math: RNG = Math) {
    this.pool = [];
    this.math = math;
    //
    // When seedrandom.js is loaded, we immediately mix a few bits
    // from the built-in RNG into the entropy pool.  Because we do
    // not want to interfere with deterministic PRNG state later,
    // seedrandom will not call math.random on its own again after
    // initialization.
    //
    this.mixkey(this.math.random(), this.pool);
  }

  random(seed: string | number[]): PRNG
  random(seed: string | number[], options: SeedRandomOptions | boolean): ReturnType<SeedRandomOptions['pass']>
  random(seed: string | number[], options?: SeedRandomOptions | boolean, callback?: SeedRandomCallback): ReturnType<SeedRandomCallback> {
    const key = [];
    const opts = (options == true) ? { entropy: true } : (options || {});

    // Flatten the seed string or build one from local entropy if needed.
    const shortseed = this.mixkey(this.flatten(opts.entropy ? [seed, this.tostring(this.pool)] : seed, 3), key);

    // Use the seed to initialize an ARC4 generator.
    const arc4 = new ARC4(key);

    // This function returns a random double in [0, 1) that contains
    // randomness in every bit of the mantissa of the IEEE 754 value.
    const prng: PRNG = function () {
      let n = arc4.g(CHUNKS),             // Start with a numerator n < 2 ^ 48
        d = DENOM,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
      while (n < SIGN) {          // Fill up all significant digits by
        n = (n + x) * WIDTH;              //   shifting numerator and
        d *= WIDTH;                       //   denominator and generating a
        x = arc4.g(1);                    //   new least-significant-byte.
      }
      while (n >= OVERFLOW) {             // To avoid rounding up, before adding
        n /= 2;                           //   last byte, shift everything
        d /= 2;                           //   right using integer math until
        x >>>= 1;                         //   we have exactly the desired bits.
      }
      return (n + x) / d;                 // Form the number within [0, 1).
    };

    prng.int32 = function () { return arc4.g(4) | 0; }
    prng.quick = function () { return arc4.g(4) / 0x100000000; }
    prng.double = prng;

    // Mix the randomness into accumulated entropy.
    this.mixkey(this.tostring(arc4.S), this.pool);

    // Calling convention: what to return as a function of prng, seed, is_math.
    const fn = opts.pass || callback ||
      ((prng: PRNG, seed, state): PRNG => {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (typeof state === 'object' && state.S) { this.copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function () { return this.copy(arc4, {}); }
        }
        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        return prng;
      });

      return fn(prng, shortseed, opts.state);
  }

  //
  // copy()
  // Copies internal state of ARC4 to or from a plain object.
  //
  copy(f: ARC4Type | Partial<ARC4Type>, t: ARC4Type | Partial<ARC4Type>): ARC4Type {
    t.i = f.i;
    t.j = f.j;
    t.S = f.S.slice();

    return t as ARC4Type;
  };

  //
  // flatten()
  // Converts an object tree to nested arrays of strings.
  //
  flatten(obj, depth: number): string | number | number[] {
    var result = [], prop: string;
    if (depth && typeof obj === 'object') {
      for (prop in obj) {
        try { result.push(this.flatten(obj[prop], depth - 1)); } catch (e) { }
      }
    }
    return (result.length ? result : typeof obj === 'string' ? obj : obj + '\0');
  }


  //
  // mixkey()
  // Mixes a string seed into a key that is an array of integers, and
  // returns a shortened string seed that is equivalent to the result key.
  //
  mixkey(seed: string | number | number[], key: number[]): string {
    var stringseed = seed + '', smear, j = 0;
    while (j < stringseed.length) {
      key[MASK & j] =
        MASK & ((smear ^= key[MASK & j] * 19) + stringseed.charCodeAt(j++));
    }

    return this.tostring(key);
  }

  //
  // tostring()
  // Converts an array of charcodes to a string
  //
  tostring(a: number[]): string {
    return String.fromCharCode.apply(0, a);
  }
}

const seedRandom = new SeedRandom();

export { SeedRandom };
export default seedRandom;
