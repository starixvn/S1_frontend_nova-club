import { useAppSelector } from 'app/provider/redux/store'
import React from 'react'
import MainHeader from './MainHeader'

//todo: Different Header for Guest/NonLogin View
const HeaderSelection = () => {
  const { token } = useAppSelector((state) => state.auth.info) || {}

  return token ? <MainHeader /> : null
}

export default HeaderSelection
