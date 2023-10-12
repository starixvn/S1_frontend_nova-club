import useDepositList from 'app/features/deposit/tools/useDepositList'
import usePathname from 'app/hooks/usePathname'
import {
  DEPOSIT_NOTES,
  TOPUP_NOTES,
  TRANSFER_NOTES,
  WITHDRAWAL_NOTES,
} from 'app/utils/constant'
import LeftPanelContainer from 'desktop-ext/components/layout/LeftPanelContainer'
import PageContainer from 'desktop-ext/components/layout/PageContainer'
import WalletMenu from 'desktop-ext/components/layout/WalletMenu'
import { NAVIGATION_HEIGHT } from 'desktop-ext/components/layout/navigation/NavigationHeader'
import DepositRoutes from 'desktop-ext/routes/depositRoutes'
import HistoryRoutes from 'desktop-ext/routes/historyRoutes'
import TransferRoutes from 'desktop-ext/routes/transferRoutes'
import { WALLET_PATH } from 'desktop-ext/routes/walletRoutes'
import WithdrawalRoutes from 'desktop-ext/routes/withdrawalRoutes'
import { Container, Row, View, styled } from 'dripsy'
import { useEffect, useState } from 'react'
import TabNavMenu from './TabNavMenu'

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentPath = usePathname()
  const { paymentMethodList, isLoading } = useDepositList()

  const [menuRoutes, setMenuRoutes] = useState(TransferRoutes)
  const [noticeNotes, setNoticeNotes] = useState<string[] | undefined>(
    TRANSFER_NOTES
  )

  useEffect(() => {
    if (currentPath.includes(WALLET_PATH.TRANSFER)) {
      setMenuRoutes(TransferRoutes)
      setNoticeNotes(TRANSFER_NOTES)
      return
    }
    if (currentPath.includes(WALLET_PATH.DEPOSIT)) {
      console.log(currentPath)
      const availableRoutes = DepositRoutes.filter((route) =>
        paymentMethodList.find((el) => route.categoryId === el.categoryId)
      )

      setMenuRoutes(availableRoutes)
      setNoticeNotes(
        currentPath.includes('topup-card') ? TOPUP_NOTES : DEPOSIT_NOTES
      )
      return
    }
    if (currentPath.includes(WALLET_PATH.WITHDRAWAL)) {
      setMenuRoutes(WithdrawalRoutes)
      setNoticeNotes(WITHDRAWAL_NOTES)
      return
    }
    if (currentPath.includes(WALLET_PATH.HISTORY)) {
      setMenuRoutes(HistoryRoutes)
      setNoticeNotes(undefined)
      return
    }
  }, [currentPath, paymentMethodList])

  return (
    <Container sx={{ minHeight: `calc(100vh - ${NAVIGATION_HEIGHT}px)` }}>
      <WalletMenu currentTab={currentPath} />
      <Row>
        <LeftPanelContainer>
          <TabNavMenu routes={menuRoutes} notice={noticeNotes} />
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
