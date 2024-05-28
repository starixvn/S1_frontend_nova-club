import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const WithdrawalScreen = ({ children }) => {
  const { replace } = useRouter()

  useEffect(() => replace('/withdrawal/bank-withdrawal'), [])

  return null
}

export default WithdrawalScreen
