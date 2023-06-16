import { DesktopRoute } from './NavigationType'

const _Routes: Readonly<DesktopRoute[]> = [
  {
    key: 'Receive',
    title: 'transfer.receive',
    icon: 'lba',
    route: '/transfer/receive',
  },
  {
    key: 'IDTransfer',
    title: 'transfer.idTransfer',
    icon: 'cp',
    route: '/transfer/id-transfer',
  },
  {
    key: 'QRTransfer',
    title: 'transfer.qrTransfer',
    icon: 'cp',
    route: '/transfer/qr-transfer',
  },
] as const

export type TransferRoutesParamList = Record<
  (typeof _Routes)[number]['key'],
  undefined | object
>

const TransferRoutes = _Routes

export default TransferRoutes
