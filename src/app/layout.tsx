import { clsx } from 'clsx';

import { fonts } from '@/app/fonts';
import { Layout } from '@/components/layout';

import '@/app/globals.css';

const RootLayout = async ({ children }) => {
  return (
    <html
      className={clsx(fonts.variable, 'antialiased')}
      lang="en"
      dir="ltr"
      suppressHydrationWarning>
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}

export default RootLayout;
