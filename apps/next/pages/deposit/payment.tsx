import React from 'react'
import { GetServerSideProps } from 'next'

interface ErrorProps {}

const PaymentPage: React.FC<ErrorProps> = () => {
  return null
}

export const getServerSideProps: GetServerSideProps<
  ErrorProps
> = async ({}) => {
  return {
    redirect: {
      destination: '/deposit',
      permanent: false,
    },
  }
}

export default PaymentPage
