import React from 'react'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { fontName } from 'app/provider/dripsy'
import { useRouter } from 'next/router'
import PlinkoTncEn from '../../components/plinko-event/PlinkoTncEn'
import PlinkoTncVi from '../../components/plinko-event/PlinkoTncVi'
import { useAppSelector } from 'app/provider/redux/store'

const FONT_COLOR = '#FFF'
const FONT_SIZE = 12

const PlinkoTnc = () => {
  const router = useRouter()
  const deviceLocale = useAppSelector((s) => s.setting.locale)
  const locale = router.query?.locale ? router.query?.locale : deviceLocale

  const TnCLanguage = () => {
    switch (locale) {
      case 'en':
        return <PlinkoTncEn />
      case 'vi':
        return <PlinkoTncVi />
      default:
        return <PlinkoTncVi />
    }
  }

  return (
    <PageWithBackHeader header={{ title: 'menu.tnc' }}>
      <main
        style={{
          padding: 12,
          fontFamily: fontName,
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
    </PageWithBackHeader>
  )
}

export default PlinkoTnc
