import React from 'react'
import { useRouter } from 'next/router'

const TnC = () => {
  const { locale } = useRouter()
  console.log('🚀 ~ file: TnC.web.tsx ~ line 6 ~ TnC ~ locale', locale)

  return <main style={{ color: 'white' }}>TnC: {locale}</main>
}

export default TnC
