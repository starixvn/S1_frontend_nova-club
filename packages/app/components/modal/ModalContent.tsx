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

interface ActionsProps {
  label: string
  loading?: boolean
  onPress: (e: GestureResponderEvent) => void
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
          bounces={true}
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
                  <Icon name="notice" size={24} color="white" sx={{ mr: 12 }} />
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
            actions.map((item) => (
              <Button
                key={item.label}
                loading={item?.loading}
                onPress={item.onPress}
                sx={{
                  mb: '$3',
                  bg:
                    item.label === t('common.cancel')
                      ? '$disabled'
                      : '$secondary.500',
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

const ModalBackground = styled(DripsyGradient)({
  borderRadius: 20,
  p: '10%',
  alignItems: 'center',
})

const ModalHeader = styled(View)({
  pt: 12,
  pb: 12,
})

const TextTitle = styled(Text)({
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 18,
})

const ViewBody = styled(View)({
  flex: 1,
  width: '100%',
})
const ViewFooter = styled(View)({
  mt: 12,
})
export default ModalContent
