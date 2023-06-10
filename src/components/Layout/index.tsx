import React from 'react'
import { cn } from '@/lib/utils'
import { fontSans } from '@/lib/font'

interface Props{
    children: React.ReactNode
}
const Layout:React.FC<Props> = ({children}) => {
  return (
    <div className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>{children}</div>
  )
}

export default Layout