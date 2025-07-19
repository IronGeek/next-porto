/*!
 * Adapted from Jono Shields's <jonathonshields@gmail.com> Floral Image
 * https://github.com/foopod/floral-image
 *
 * Jakka Prihatna <jprihatna@gmail.com>
 */

'use client';

import { ClassicalNoise } from '@/lib/floral/perlin-noise';
import seedRandom from '@/lib/floral/seed-random';
import { ComponentProps, useEffect, useRef } from 'react';

interface FloralPatternOptions {
  readonly full?: boolean
  readonly updateInterval?: number
}

class FloralPattern {
  readonly #canvas: HTMLCanvasElement;
  readonly #perlin: ClassicalNoise;
  readonly #full: boolean;
  readonly #updateInterval: number;

  #count: number = 0;
  #interval: number | null = null;

  constructor(canvas: HTMLCanvasElement, options?: FloralPatternOptions) {
    this.#perlin = new ClassicalNoise(Math);

    this.#full = options?.full ?? false;
    this.#updateInterval = options?.updateInterval ?? 0;
    this.#canvas = canvas;
  }

  get context() {
    return this.#canvas.getContext('2d');
  }

  get running() {
    return this.#interval !== null;
  }

  start() {
    this.#resize();

    if (this.#updateInterval <=0) { return this.#loop() }

    this.#interval = window.setInterval(this.#loop.bind(this), this.#updateInterval);
  }

  stop() {
    if (this.#interval) {
      clearInterval(this.#interval);

      this.#interval = null;
    }
  }

  #loop() {
    const size = 50;
    const diff = 40;

    for (var y = 0; y < this.#canvas.height / size; y++) {
      for (var x = 0; x < this.#canvas.width / size; x++) {
        let colorArray = new Array(4) as string[];

        colorArray[0] = this.#hsv2rgb((this.#perlin.noise(x * 5 / diff + this.#count * 0.05, y * 5 / diff + this.#count * 0.05, 0) + 0.5) * 255, 0.75, 0.95);
        colorArray[1] = this.#hsv2rgb((this.#perlin.noise(x * 5 / diff + this.#count * 0.05, y * 5 / diff + this.#count * 0.05, 0) + 0.5) * 255, 0.45, 0.98);
        colorArray[2] = this.#hsv2rgb((this.#perlin.noise(x * 5 / diff + this.#count * 0.05, y * 5 / diff + this.#count * 0.05, 0) + 0.5) * 255, 0.85, 0.9);
        colorArray[3] = this.#hsv2rgb((this.#perlin.noise(x * 5 / diff + this.#count * 0.05, y * 5 / diff + this.#count * 0.05, 0) + 0.5) * 255, 0.65, 0.92);
        colorArray = this.#shuffle(colorArray, x, y);

        this.#drawTri(x, y, size, size, "up", colorArray[1]);
        this.#drawTri(x, y, size, size, "down", colorArray[2]);
        this.#drawTri(x, y, size, size, "left", colorArray[3]);
        this.#drawTri(x, y, size, size, "right", colorArray[4]);
      }
    }

    this.#count += 0.3;
  }

  #drawTri(x: number, y: number, xdiv: number, ydiv: number, type: 'up' | 'down' | 'left' | 'right', color: string) {
    const ctx = this.context;

    switch (type) {
      case "up":
        ctx.beginPath();
        ctx.moveTo(x * xdiv, y * ydiv);
        ctx.lineTo(x * xdiv + 0.5 * xdiv, y * ydiv + 0.5 * ydiv);
        ctx.lineTo(x * xdiv + xdiv, y * ydiv);
        ctx.lineTo(x * xdiv, y * ydiv);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        break;
      case "down":
        ctx.beginPath();
        ctx.moveTo(x * xdiv, y * ydiv + ydiv);
        ctx.lineTo(x * xdiv + 0.5 * xdiv, y * ydiv + 0.5 * ydiv);
        ctx.lineTo(x * xdiv + xdiv, y * ydiv + ydiv);
        ctx.lineTo(x * xdiv, y * ydiv + ydiv);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        break;
      case "left":
        ctx.beginPath();
        ctx.moveTo(x * xdiv, y * ydiv);
        ctx.lineTo(x * xdiv + 0.5 * xdiv, y * ydiv + 0.5 * ydiv);
        ctx.lineTo(x * xdiv, y * ydiv + ydiv);
        ctx.lineTo(x * xdiv, y * ydiv);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        break;
      case "right":
        ctx.beginPath();
        ctx.moveTo(x * xdiv + xdiv, y * ydiv);
        ctx.lineTo(x * xdiv + 0.5 * xdiv, y * ydiv + 0.5 * ydiv);
        ctx.lineTo(x * xdiv + xdiv, y * ydiv + ydiv);
        ctx.lineTo(x * xdiv + xdiv, y * ydiv);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        break;
    }
  }

  #shuffle(array: string[], x: number, y: number): string[] {
    let currentIndex: number = array.length, temporaryValue: string, randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      const r = seedRandom.random(x + "," + y);

      randomIndex = Math.floor(r.double() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  #resize() {
    const owner = this.#full ? document.body : this.#canvas.parentElement;
    if (!owner) { return }

    this.#canvas.width = owner.clientWidth;
    this.#canvas.height = owner.clientHeight;
  }

  #hsv2rgb(h: number, s: number, v: number): string {
    // adapted from http://schinckel.net/2012/01/10/hsv-to-rgb-in-javascript/
    let rgb: [number, number, number], i: number;

    if (s === 0) {
      rgb = [v, v, v];
    } else {
      h = h / 60;
      i = Math.floor(h);

      let data = [v * (1 - s), v * (1 - s * (h - i)), v * (1 - s * (1 - (h - i)))];

      switch (i) {
        case 0:
          rgb = [v, data[2], data[0]];
          break;
        case 1:
          rgb = [data[1], v, data[0]];
          break;
        case 2:
          rgb = [data[0], v, data[2]];
          break;
        case 3:
          rgb = [data[0], data[1], v];
          break;
        case 4:
          rgb = [data[2], data[0], v];
          break;
        default:
          rgb = [v, data[0], data[1]];
          break;
      }
    }

    return '#' + rgb.map(function (x) {
      return ("0" + Math.round(x * 255).toString(16)).slice(-2);
    }).join('');
  }
}

type FloralImageProps = ComponentProps<'div'> & {
  readonly full?: boolean
  readonly updateInterval?: number
}

const FloralImage = ({ full, updateInterval, ...props }: FloralImageProps) => {
  const floralRef = useRef<FloralPattern>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const floral = new FloralPattern(canvasRef.current, { full, updateInterval });
    floralRef.current = floral;

    const handleVisibilityChange = (e: Event) => {
      const doc = e.target as Document;
      if (doc.hidden) {
        if (floralRef.current.running) { floralRef.current.stop(); }
      } else if (!floralRef.current.running) {
        floralRef.current.start();
      }
    };

    floral.start();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      floral.stop();
      floralRef.current = null;
    }
  }, []);

  return (
    <div {...props}>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
};

export { FloralPattern, FloralImage }

export type { FloralPatternOptions, FloralImageProps }
