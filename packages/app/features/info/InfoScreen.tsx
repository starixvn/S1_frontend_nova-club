import AvertaStd from 'app/assets/fonts/Averta'
import { useAppSelector } from 'app/provider/redux/store'
import { LANGUAGE_CODE } from 'app/utils/constant'
import { useRouter } from 'next/router'
import React, { ComponentType } from 'react'

const FONT_COLOR = '#FFF'
const FONT_SIZE = '0.85rem'

export type InfoContentLocalization = {
  [index in LANGUAGE_CODE]: ComponentType<{}>
}

export interface InfoScreenProps {
  map: InfoContentLocalization
}

const InfoScreen = ({ map }: InfoScreenProps) => {
  const settingLocale = useAppSelector((s) => s.setting.locale)
  const router = useRouter()
  const locale = router.query?.locale ? router.query?.locale : settingLocale
  const TnCLanguage = typeof locale === 'string' ? map[locale] : map.vi

  return (
    <main
      style={{
        padding: 12,
        fontFamily: AvertaStd.Regular.name,
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

export default InfoScreen
