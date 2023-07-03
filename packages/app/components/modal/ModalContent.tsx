import useLocalization from 'app/provider/localization'
import { ScrollView, Text, View, styled } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import React, { ReactElement } from 'react'
import { GestureResponderEvent } from 'react-native'
import { useModal } from 'react-native-modalfy'
import Icon from '../Icon'
import TouchableOpacity from '../pressable/TouchableOpacity'
import { DripsyGradient } from '../Gradient'
import Button from '../common/Button'
import { FONT_TOP_OFFSET } from 'app/constants/font'

interface ActionsProps {
  label: string
  loading?: boolean
  onPress: (e: GestureResponderEvent) => void
  bg?: string
  disableAutoClose?: boolean
}
interface ModalContentProps {
  title?: string
  isShowHeader?: boolean
  actions?: ActionsProps[]
  children: ReactElement
  disableAction?: boolean
}

const ModalContent = ({
  title,
  isShowHeader = true,
  actions,
  children,
  disableAction = true,
}: ModalContentProps) => {
  const { t } = useLocalization()
  const { closeModal } = useModal()
  const TITLE = t('notes.importantNotice')

  return (
    <>
      <ModalBackground gradient={'surface'}>
        <ScrollView
          bounces
          contentContainerSx={{
            minHeight: 150,
          }}
        >
          {isShowHeader && (
            <ModalHeader>
              {title ? (
                <TextTitle>{title}</TextTitle>
              ) : (
                <View
                  sx={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="notice" size={16} color="white" sx={{ mr: 12 }} />
                  <TextTitle>{TITLE.toUpperCase()}</TextTitle>
                </View>
              )}
            </ModalHeader>
          )}
          <ViewBody>{children}</ViewBody>
        </ScrollView>
      </ModalBackground>

      {disableAction && (
        <ViewFooter>
          {actions ? (
            actions.map((item, i) => (
              <Button
                key={item.label}
                loading={item?.loading}
                onPress={(e) => {
                  if (!item.disableAutoClose && closeModal)
                    closeModal(undefined, () => item.onPress && item.onPress(e))
                  else {
                    item.onPress && item.onPress(e)
                  }
                }}
                sx={{
                  mb: '$2',
                  bg:
                    item.label === t('common.cancel')
                      ? '$disabled'
                      : item.bg ?? '$secondary.500',
                }}
              >
                {item.label}
              </Button>
            ))
          ) : (
            <Button onPress={() => closeModal()}>{t('common.close')}</Button>
          )}
        </ViewFooter>
      )}
    </>
  )
}

const ModalBackground = styled(DripsyGradient)(({}) => {
  return {
    borderRadius: 15,
  }
})

const ModalHeader = styled(View)({
  pt: 12,
  pb: 12,
  mb: '$2',
})

const TextTitle = styled(Text)({
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: [14, 14, 16, 16],
  mt: FONT_TOP_OFFSET,
})

const ViewBody = styled(View)({
  flex: 1,
  width: '100%',
})

const ViewFooter = styled(View)({
  width: 300,
  maxWidth: '100%',
  alignSelf: 'center',
  mt: '$2',
})
export default ModalContent
