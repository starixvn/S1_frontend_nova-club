import DrawerProvider from 'app/components/navigation/Drawer/DrawerProvider'
import { Dripsy } from './dripsy'

export function Provider({ children }: { children: React.ReactNode }) {
  return <Dripsy>{children}</Dripsy>
}
