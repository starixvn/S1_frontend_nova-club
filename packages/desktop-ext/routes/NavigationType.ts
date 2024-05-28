import { DepositPaymentMethodCategoryId } from 'app/config/deposit'

export interface DesktopRoute {
  base?: string
  title: string
  route: string
  icon?: string
  altIcon?: string
  key: string
  params?: any
  categoryId?: DepositPaymentMethodCategoryId | DepositPaymentMethodCategoryId[]
}
