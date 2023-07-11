import React from 'react'
import { GetServerSideProps } from 'next'

interface ErrorProps {
  statusCode: number
  currentPath: string
}

const ErrorPage: React.FC<ErrorProps> = () => {
  return null
}

export const getServerSideProps: GetServerSideProps<ErrorProps> = async ({
  res,
  req,
}) => {
  const statusCode = res?.statusCode
  const currentPath = req?.url || ''

  if (statusCode === 404) {
    if (currentPath.includes('/deposit')) {
      return {
        redirect: {
          destination: '/deposit',
          permanent: false,
        },
      }
    }
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
      currentPath,
    },
  }
}

export default ErrorPage
