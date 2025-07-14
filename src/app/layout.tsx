import { clsx } from 'clsx';
import { headers } from 'next/headers';

import { fonts } from '@/app/fonts';
import { Layout } from '@/components/layout';

import '@/app/globals.scss';

const RootLayout = async ({ children }) => {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "";
  console.log(pathname);

  return (
    <html
      className={clsx(fonts.variable, 'antialiased')}
      lang="en"
      dir="ltr"
      suppressHydrationWarning>
      <body>
        {pathname}
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}

export default RootLayout;
