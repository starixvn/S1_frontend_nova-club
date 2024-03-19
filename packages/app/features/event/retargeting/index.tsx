import { useAppSelector } from 'app/provider/redux/store'
import React from 'react'
import Retention4Blank from './Retention4Blank'
import Retention4Event from './Retention4Event'

const Retention4 = () => {
  const isLoggedIn = useAppSelector((s) => !!s.auth.info)

  return isLoggedIn ? <Retention4Event /> : <Retention4Blank />
}

export default Retention4
