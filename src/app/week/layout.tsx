import { AuthGuard } from '@/common/providers/auth_guard'
import Footer from '@/components/footer.component'
import Header from '@/components/header.component'
import Main from '@/components/main.component'

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: '会議室予約管理システム',
}

export default function WeekLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AuthGuard>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </AuthGuard>
    </>
  )
}
