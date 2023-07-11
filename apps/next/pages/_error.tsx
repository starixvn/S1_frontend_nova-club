import React from 'react'
import { GetServerSideProps } from 'next'

interface ErrorProps {
  statusCode: number
}

const ErrorPage: React.FC<ErrorProps> = () => {
  return null
}

export const getServerSideProps: GetServerSideProps<ErrorProps> = async ({
  res,
}) => {
  const statusCode = res?.statusCode

  if (statusCode === 404) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      statusCode,
    },
  }
}

export default ErrorPage
