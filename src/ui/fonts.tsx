import { Andika, MuseoModerno, M_PLUS_1_Code, Schoolbell } from 'next/font/google'

const andika = Andika({
  weight: '400',
  variable: '--font-andika',
  subsets: ['latin'],
});

const museoModerno = MuseoModerno({
  weight: '400',
  variable: '--font-museo-moderno',
  subsets: ['latin'],
});

const mPlus1Code = M_PLUS_1_Code({
  weight: '400',
  variable: '--font-m-plus-1-code',
  subsets: ['latin']
});

const schoolbell = Schoolbell({
  weight: '400',
  variable: '--font-schoolbell',
  subsets: ['latin']
});


const fonts = Object.freeze({
  className: [andika.className, museoModerno.className, mPlus1Code.className, schoolbell.className].join(' '),
  style: [andika.style, museoModerno.style, mPlus1Code.style, schoolbell.style].join(' '),
  variable: [andika.variable, museoModerno.variable, mPlus1Code.variable, schoolbell.variable].join(' ')
});

export { andika, museoModerno, mPlus1Code, schoolbell, fonts }
