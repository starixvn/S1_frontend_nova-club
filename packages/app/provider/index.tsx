import { Dripsy } from './dripsy'
import ReduxProvider from './redux'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Dripsy>
      <ReduxProvider>{children}</ReduxProvider>
    </Dripsy>
  )
}
