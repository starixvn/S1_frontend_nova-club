import React from 'react'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { fontName } from 'app/provider/dripsy'
import { useRouter } from 'next/router'
import TncEn from '../../components/predictionTnc/TncEn'
import TncVi from '../../components/predictionTnc/TncVi'

const FONT_COLOR = '#FFF'
const FONT_SIZE = 12

declare global {
  interface Window {
    ReactNativeWebView?: object
  }
}

const PredictionTnc = () => {
  const router = useRouter()

  const TnCLanguage = () => {
    switch (router.query?.locale) {
      case 'en':
        return <TncEn />
      case 'vi':
        return <TncVi />

      default:
        return <TncVi />
    }
  }

  const isHideHeader = window?.ReactNativeWebView

  return (
    <PageWithBackHeader
      header={{ title: 'menu.tnc' }}
      hideHeader={!!isHideHeader}
    >
      <main
        style={{
          padding: 12,
          fontFamily: fontName,
          fontSize: FONT_SIZE,
          color: FONT_COLOR,
        }}
      >
        <style jsx="true">{`
          ol {
            list-style-type: none;
            counter-reset: item;
            margin: 0;
            padding: 0;
          }

          li {
            display: table;
            counter-increment: item;
            margin-bottom: 0.6em;
          }

          li:before {
            content: counters(item, '.') '. ';
            display: table-cell;
            padding-right: 0.6em;
          }

          li li {
            margin: 0;
            margin-bottom: 0.4em;
          }

          li li:before {
            content: counters(item, '.') ' ';
          }

          li div {
            margin-bottom: 0.6em;
          }

          .sub-header {
            display: inline-block;
            margin-bottom: 0.4em;
          }
        `}</style>

        <TnCLanguage />
      </main>
    </PageWithBackHeader>
  )
}

export default PredictionTnc
