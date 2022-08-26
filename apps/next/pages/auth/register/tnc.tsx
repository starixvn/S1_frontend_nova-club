import React from 'react'

import TncEn from '../../../components/tnc/TncEn'
import { PageWithBackHeader } from 'app/components/layout/Page'
import { fontName } from 'app/provider/dripsy'
import TncVi from '../../../components/tnc/TncVi'
import { useRouter } from 'next/router'

const FONT_COLOR = '#FFF'
const FONT_SIZE = 12

const TnC = () => {
  const router = useRouter()
  const isEnglish = router.query?.locale === 'en'

  console.log('🚀 ~ file: index.tsx ~ line 6 ~ TnC ~ router', router)

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

        {isEnglish ? <TncEn /> : <TncVi />}
      </main>
    </PageWithBackHeader>
  )
}

export default TnC
