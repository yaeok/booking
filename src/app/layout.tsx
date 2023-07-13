import styles from '@/app/global.module.css'
import Provider from '@/common/providers/provider'
import Footer from '@/components/footer.component'
import Header from '@/components/header.component'
import Main from '@/components/main.component'

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: '会議室予約管理システム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body className={styles.body}>
        <Provider>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
