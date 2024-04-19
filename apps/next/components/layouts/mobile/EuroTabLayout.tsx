import EuroBottomTab from 'app/features/event/euroCup/components/EuroBottomTab'
import { ReactNode } from 'react'

export default function EuroTabLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <FloatedBottomBar />
    </div>
  )
}

const FloatedBottomBar = () => {
  return (
    <div
      style={{
        bottom: 0,
        position: 'fixed',
        zIndex: 1,
        width: '100%',
      }}
    >
      <EuroBottomTab />
    </div>
  )
}
