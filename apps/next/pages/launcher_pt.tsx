import React from 'react'
import { store } from 'app/provider/redux/store'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Script from 'next/script'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { MotiView } from 'moti'
import useLocalization from 'app/provider/localization'
import { gameApi } from 'services/gameApi'

const DEFAULT_ERROR = `game.invalidSession`
const UNABLE_TO_CONNECT = `game.unableToConnect`
/* 
  CUSTOM
  0 - no username / password
  99 - no gamecode
  98 - Failed to retrieve PT credential, check gotogame api
  20004 -Invalid Token or User not login

  FROM PT
  3 - Domain not whitelisted
  48 - 请在指定区域或使用VPN登录PT
  12 - show player error message from the game
*/

const LauncherPT: NextPage<LauncherPTProps> = (props) => {
  const { username, password, demo, code, domain, systemIdVar, errorCode } =
    props

  const { t } = useLocalization()

  const [isScriptReady, setScriptReady] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    if (errorCode) setErrorMessage(t(UNABLE_TO_CONNECT, { code: errorCode }))
    else {
      // TODO perform auto login to h5 with token and username
      // ( can be retrieved from useRouter() query "t" and "username")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isScriptReady) {
      if (window.iapiSetCallout) {
        window.iapiSetCallout('Login', onPtLoginCallback)
        window.iapiSetCallout(
          'GetTemporaryAuthenticationToken',
          onTempTokenCallback
        )

        if (!username || !password) {
          setErrorMessage(
            t(DEFAULT_ERROR, {
              code: 0,
            })
          )
        } else if (!code) {
          setErrorMessage(
            t(DEFAULT_ERROR, {
              code: code ? 0 : 99,
            })
          )
        } else window.iapiLogin(username, password, 1)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScriptReady])

  async function onPtLoginCallback(response: PTLoginCallback) {
    const { errorCode, playerMessage } = response
    if (!errorCode) {
      window.iapiRequestTemporaryToken(demo ? 0 : 1, systemIdVar, 'GamePlay')
    } else {
      setErrorMessage(t(UNABLE_TO_CONNECT, { code: errorCode }))
    }
  }

  function onTempTokenCallback(response) {
    console.log('response', response)

    // launch_alias=newhot is for PT Live Casino default to NEW & HOT tab
    const clientUrl = `https://hub.${domain}.com/igaming/?gameId=${code}&real=${
      demo ? 0 : 1
    }&username=${username}&lang=vi&tempToken=${
      response.sessionToken.sessionToken
    }&lobby=/&support=support.html&logout=logout.html&deposit=/deposit&launch_alias=newhot`

    document.location = clientUrl
  }

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        boxShadow: `inset 0em 0em 1em ${demo ? 'black' : 'rgb(6 109 154)'}`,
      }}
    >
      <MotiView
        animate={{
          scale: [1, 1.02],
          opacity: [1, 0.9],
        }}
        transition={{
          type: 'timing',
          duration: 1000,
          loop: errorCode == undefined,
        }}
      >
        <Image
          src={require('app/assets/images/provider/PT.png')}
          width={251}
          height={56}
        />
      </MotiView>
      <View
        style={{
          height: 40,
          width: 700,
          maxWidth: '80%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {errorMessage ? (
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              lineHeight: 20,
            }}
          >
            {errorMessage}
          </Text>
        ) : (
          <ActivityIndicator color="white" />
        )}
      </View>
      {!errorCode && (
        <Script
          onLoad={() => {
            setScriptReady(true)
          }}
          strategy="afterInteractive"
          src="https://login.winforfun88.com/jswrapper/integration.js.php?casino=winforfun88"
        />
      )}
    </View>
  )
}

export default LauncherPT

export interface LauncherPTParams extends ParsedUrlQuery {
  code: string | string[] | undefined
  t: string | string[] | undefined
  demo: string | string[] | undefined
  username: string
}

export interface LauncherPTProps {
  username?: string
  password?: string
  code?: string
  errorCode?: string
  demo: boolean
  domain: string
  systemIdVar: number
}

export const getServerSideProps: GetServerSideProps<
  LauncherPTProps,
  LauncherPTParams
> = async ({ query }) => {
  // all value from query are strings
  const { code = '', t, demo = '0', username } = query

  const props = {
    code,
    demo: demo.toString() == '1',
    systemIdVar: 424,
    domain: 'ld176988',
  }

  if (typeof t === 'string' && typeof username === 'string') {
    try {
      const { data } = await store
        .dispatch(
          gameApi.endpoints.getGameUrl.initiate({
            game_code: code,
            is_demo: 0,
            is_mobile: 1,
            platform_code: 'PTV2',
            home_url: '/',
            token: t,
            username,
          })
        )
        .unwrap()

      if (data?.url) {
        const ptCredential = JSON.parse(data.url)

        Object.assign(props, {
          username: ptCredential.username,
          password: ptCredential.password,
        })
      } else {
        Object.assign(props, {
          errorCode: 98,
        })
      }
    } catch (e) {
      console.log('GOTOGAME error : ', e)
      if (e?.code) {
        Object.assign(props, {
          errorCode: e.code,
        })
      }
    }
  }

  return {
    props,
  }
}

// PT Types
declare global {
  interface Window {
    // PT integration script interfaces from https://login.winforfun88.com/jswrapper/integration.js.php?casino=winforfun88
    iapiSetCallout: (
      id: string,
      callback: (response: PTLoginCallback) => void
    ) => void
    iapiSetClientPlatform: (platform: string) => void
    iapiLogin: (
      username: string,
      password: string,
      realMode: number, // 1 / 0
      language?: string,
      rememberMeLogin?: boolean
    ) => void
    iapiRequestTemporaryToken: (
      realMode: number, // 1 / 0
      systemId: number,
      serviceType: string
    ) => void
  }

  /* 
    3 = Domain not whitelisted
    48 = 请在指定区域或使用VPN登录PT
    12 = show player message from the game
    .. 
    ..
    ..
  */
  interface PTLoginCallback {
    errorCode?: number
    playerMessage: string
    requestId: string
    sessionRef: string
  }
}
