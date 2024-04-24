import useDepositList from 'app/features/deposit/tools/useDepositList'
import usePathname from 'app/hooks/usePathname'
import {
  DEPOSIT_NOTES,
  TOPUP_NOTES,
  TRANSFER_NOTES,
  WITHDRAWAL_NOTES,
} from 'utils/constant'
import LeftPanelContainer from 'desktop-ext/components/layout/LeftPanelContainer'
import PageContainer from 'desktop-ext/components/layout/PageContainer'
import WalletMenu from 'desktop-ext/components/layout/WalletMenu'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'
import HistoryRoutes from 'desktop-ext/routes/historyRoutes'
import TransferRoutes from 'desktop-ext/routes/transferRoutes'
import { WALLET_PATH } from 'desktop-ext/routes/walletRoutes'
import WithdrawalRoutes from 'desktop-ext/routes/withdrawalRoutes'
import { ActivityIndicator, Container, Row, View, styled } from 'dripsy'
import { useEffect, useState } from 'react'
import TabNavMenu from './TabNavMenu'
import { useCryptoBankQuery } from 'services/bank'
import { DesktopRoute } from 'desktop-ext/routes/NavigationType'

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentPath = usePathname()
  const { paymentMethodList, isLoading } = useDepositList(
    !currentPath.includes(WALLET_PATH.DEPOSIT)
  )
  const { data: cryptoBankList } = useCryptoBankQuery()

  const [menuRoutes, setMenuRoutes] = useState<DesktopRoute[]>()
  const [noticeNotes, setNoticeNotes] = useState<string[] | undefined>(
    TRANSFER_NOTES
  )

  useEffect(() => {
    if (currentPath.includes(WALLET_PATH.TRANSFER)) {
      setMenuRoutes(TransferRoutes as DesktopRoute[])
      setNoticeNotes(TRANSFER_NOTES)
      return
    } else if (currentPath.includes(WALLET_PATH.DEPOSIT)) {
      if (paymentMethodList && paymentMethodList.length > 0) {
        setMenuRoutes(
          paymentMethodList.map((m) => {
            return {
              key: m.name,
              categoryId: m.categoryId,
              title: m.name,
              icon: m.icon,
              route: m.path,
            }
          })
        )
      } else setMenuRoutes(undefined)

      setNoticeNotes(DEPOSIT_NOTES)
      return
    } else if (currentPath.includes(WALLET_PATH.WITHDRAWAL)) {
      let routes = WithdrawalRoutes
      if (cryptoBankList && cryptoBankList.length === 0)
        routes = routes.filter((el) => el.key !== 'Crypto')

      setMenuRoutes(routes as DesktopRoute[])
      setNoticeNotes(WITHDRAWAL_NOTES)
      return
    } else if (currentPath.includes(WALLET_PATH.HISTORY)) {
      setMenuRoutes(HistoryRoutes as DesktopRoute[])
      setNoticeNotes(undefined)
      return
    }
  }, [cryptoBankList, currentPath, paymentMethodList])

  return (
    <Container sx={{ minHeight: `calc(100vh - ${NAVIGATION_HEIGHT}px)` }}>
      <WalletMenu currentTab={currentPath} />
      <Row>
        <LeftPanelContainer>
          {menuRoutes ? (
            <TabNavMenu routes={menuRoutes} notice={noticeNotes} />
          ) : isLoading ? (
            <ActivityIndicator
              color={'$primary.200'}
              size={'large'}
              sx={{ mt: '$4' }}
            />
          ) : null}
        </LeftPanelContainer>
        <PageContainer>{children}</PageContainer>
      </Row>
    </Container>
  )
}

const RightContainer = styled(View)({
  borderWidth: 1,
  flex: 1,
  borderColor: '$primary.300',
})
