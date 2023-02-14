import AccountVerification from 'app/features/profile/account-verification'
import DepositGuard from '../deposit/deposit-guard'

export default DepositGuard(AccountVerification, 'account-verification')
