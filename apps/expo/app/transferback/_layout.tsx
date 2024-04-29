import IconButton from 'app/components/IconButton'
import { PageWithBackHeader } from 'app/components/layouts/Page'
import CustomTabBar from 'app/components/navigation/CustomTabBar'
import { MaterialTopTab } from 'app/navigation/navigator/MaterialTopTab'
import useLocalization from 'app/provider/localization'
import { TRANSFER_NOTES } from 'utils/constant'
import { useModal } from 'react-native-modalfy'

export default function Transfer({}) {
  const { t } = useLocalization()
  const { openModal } = useModal()

  return (
    <PageWithBackHeader
      header={{
        title: t('transfer.transferTitle'),
        actions: (
          <IconButton
            name="notice"
            onPress={() =>
              openModal('NoticeModal', {
                notice: [TRANSFER_NOTES],
              })
            }
          />
        ),
      }}
      disableScrollView
    >
      <MaterialTopTab
        backBehavior="none"
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <MaterialTopTab.Screen
          name="receive" // This is the name of the page and must match the url from root
        />
        <MaterialTopTab.Screen
          name="id" // This is the name of the page and must match the url from root
        />
        <MaterialTopTab.Screen
          name="qr" // This is the name of the page and must match the url from root
        />
      </MaterialTopTab>
    </PageWithBackHeader>
  )
}
