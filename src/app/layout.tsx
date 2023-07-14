import styles from '@/app/global.module.css'
import { AuthContextProvider } from '@/common/providers/auth_provider'
import Provider from '@/common/providers/provider'

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
          <AuthContextProvider>{children}</AuthContextProvider>
        </Provider>
      </body>
    </html>
  )
}
