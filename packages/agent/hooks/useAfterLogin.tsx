import { StackActions, useNavigation } from '@react-navigation/native'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import {
  useAgentProfileQuery,
  useLazyAgentProfileQuery,
} from 'agent/services/agentApi'
import {
  useLazyShareholderProfileQuery,
  useShareholderProfileQuery,
} from 'agent/services/shareholderApi'
import { useLazyUserInfoQuery, useUserInfoQuery } from 'agent/services/userApi'
import { UserInfo } from 'agent/services/userApi.type'
import { ROLE } from 'agent/utils/helper'
import useContextualRouter from 'app/navigation/contextual/useContextualRouter.web'
import { useEffect, useState } from 'react'

const useAfterLogin = () => {
  const [getUserInfo] = useLazyUserInfoQuery()
  const [getAgentProfile] = useLazyAgentProfileQuery()
  const [getShareholderProfile] = useLazyShareholderProfileQuery()

  const { replace } = useContextualRouter()
  const navigation = useNavigation()

  async function handleAgentLogin() {
    try {
      const { result, message, success } = await getUserInfo().unwrap()

      if (success && result) {
        // let userRole = result.data.role
        // const isFirstTimer = await getProfileBasedOnRole(userRole)
        if (result.data.has_logged_in === 0) {
          navigation.dispatch(StackActions.push('AgentChangePassword')) //TODO change new route
        }

        replace('/agent')
      } else {
        console.log(message)
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function getProfileBasedOnRole(userRole: UserInfo['role']) {
    try {
      if (userRole === 'shareholder') {
        const {
          result: shareholderResult,
          success,
          message,
        } = await getShareholderProfile().unwrap()

        if (success && shareholderResult?.data.has_logged_in === 0) return true
      }
      if (userRole === ROLE.AGENT) {
        const {
          result: agentResult,
          success,
          message,
        } = await getAgentProfile().unwrap()

        if (success && agentResult?.data.has_logged_in === 0) return true
      }
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  }

  return {
    handleAgentLogin,
  }
}

export default useAfterLogin
