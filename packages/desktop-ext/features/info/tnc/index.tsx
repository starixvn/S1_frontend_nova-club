import React from 'react'
import { useAppSelector } from 'app/provider/redux/store'
import { useRouter } from 'next/router'
import TncEn from './TncEn'
import TncVi from './TncVi'
// import { fontName } from 'app/provider/dripsy'
const FONT_COLOR = '#FFF'
const FONT_SIZE = 12
const TncDesktop = () => {
  const settingLocale = useAppSelector((s) => s.setting.locale)
  const router = useRouter()
  const locale = router.query?.locale ? router.query?.locale : settingLocale

  const TnCLanguage = () => {
    switch (locale) {
      case 'en':
        return <TncEn />
      case 'vi':
        return <TncVi />

      default:
        return <TncEn />
    }
  }
  return (
    <main
      style={{
        padding: 12,
        // fontFamily: fontName,
        fontSize: FONT_SIZE,
        color: FONT_COLOR,
      }}
    >
      <style jsx>{`
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
      `}</style>

      <TnCLanguage />
    </main>
  )
}

export default TncDesktop
