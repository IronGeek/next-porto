// eslint-disable-next-line camelcase
import { Andika, M_PLUS_1_Code, MuseoModerno, Schoolbell } from 'next/font/google'

const andika = Andika({
  subsets: ['latin'],
  variable: '--font-andika',
  weight: '400'
});

const museoModerno = MuseoModerno({
  subsets: ['latin'],
  variable: '--font-museo-moderno',
  weight: '400'
});

const mPlus1Code = M_PLUS_1_Code({
  subsets: ['latin'],
  variable: '--font-m-plus-1-code',
  weight: '400'
});

const schoolbell = Schoolbell({
  subsets: ['latin'],
  variable: '--font-schoolbell',
  weight: '400'
});


const fonts = Object.freeze({
  className: [andika.className, museoModerno.className, mPlus1Code.className, schoolbell.className].join(' '),
  style: [andika.style, museoModerno.style, mPlus1Code.style, schoolbell.style].join(' '),
  variable: [andika.variable, museoModerno.variable, mPlus1Code.variable, schoolbell.variable].join(' ')
});

export { andika, museoModerno, mPlus1Code, schoolbell, fonts }
