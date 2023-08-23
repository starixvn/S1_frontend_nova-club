import AvertaStd from 'app/assets/fonts/Averta'
import FormContainer from 'app/components/form/FormContainer'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useRouter } from 'next/router'
import MidAutumnTncEn from '../../components/midAutumn/MidAutumnTncEn'
import MidAutumnTncVi from '../../components/midAutumn/MidAutumnTncVi'

const FONT_COLOR = '#FFF'
const FONT_SIZE = 12

const MidAutumnTnc = () => {
  const router = useRouter()
  const deviceLocale = useAppSelector((s) => s.setting.locale)
  const locale = router.query?.locale ? router.query?.locale : deviceLocale
  const { t } = useLocalization()
  const isDesktop = useIsDesktop()

  const TnCLanguage = () => {
    switch (isDesktop ? deviceLocale : locale) {
      case 'en':
        return <MidAutumnTncEn />
      case 'vi':
        return <MidAutumnTncVi />
      default:
        return <MidAutumnTncVi />
    }
  }

  return (
    <PageWithBackHeader
      header={{ title: t('menu.tnc') }}
      hideHeader={isDesktop || window.ReactNativeWebView}
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

export default MidAutumnTnc
