import React from 'react'
import { useRouter } from 'next/router'
import PlinkoTncEn from '../../components/plinko-event/PlinkoTncEn'
import PlinkoTncVi from '../../components/plinko-event/PlinkoTncVi'
import { useAppSelector } from 'app/provider/redux/store'
import AvertaStd from 'app/assets/fonts/Averta'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useLocalization from 'app/provider/localization'
import { useResponsiveValue } from 'dripsy'
import FormContainer from 'app/components/form/FormContainer'

const FONT_COLOR = '#FFF'
const FONT_SIZE = 12

const PlinkoTnc = () => {
  const router = useRouter()
  const deviceLocale = useAppSelector((s) => s.setting.locale)
  const locale = router.query?.locale ? router.query?.locale : deviceLocale
  const { t } = useLocalization()
  const isDesktop = useResponsiveValue([false, false, false, true])

  const TnCLanguage = () => {
    switch (isDesktop ? deviceLocale : locale) {
      case 'en':
        return <PlinkoTncEn />
      case 'vi':
        return <PlinkoTncVi />
      default:
        return <PlinkoTncVi />
    }
  }

  return (
    <PageWithBackHeader
      header={{ title: t('menu.tnc') }}
      hideHeader={isDesktop}
    >
      <FormContainer>
        <main
          style={{
            padding: 12,
            fontFamily: AvertaStd.Regular.name,
            fontSize: FONT_SIZE,
            color: FONT_COLOR,
          }}
        >
          <style jsx>{`
            h1 {
              text-align: center;
            }
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
      </FormContainer>
    </PageWithBackHeader>
  )
}

export default PlinkoTnc
