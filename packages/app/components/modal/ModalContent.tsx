import useLocalization from 'app/provider/localization'
import { ScrollView, Text, View, styled } from 'dripsy'
import { Gradient } from 'dripsy/gradient'
import React, { ReactElement } from 'react'
import { Button, GestureResponderEvent } from 'react-native'
import { useModal } from 'react-native-modalfy'
import Icon from '../Icon'
import TouchableOpacity from '../pressable/TouchableOpacity'

interface ActionsProps {
  label: string
  onPress: (e: GestureResponderEvent) => void
}
interface ModalContentProps {
  title?: string
  isShowHeader?: boolean
  actions?: ActionsProps[]
  children: ReactElement
  footer: boolean
}

const ModalContent = ({
  title,
  isShowHeader = true,
  actions,
  children,
  footer = true,
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
            justifyContent: 'center',
            minHeight: 225,
          }}
        >
          {isShowHeader &&
            (title ? (
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
            ))}
          <ViewBody>{children}</ViewBody>
        </ScrollView>
      </ModalBackground>

      {footer && (
        <ViewFooter>
          {actions ? (
            actions.map((item) => (
              <Gradient
                key={item.label}
                gradient={'surface'}
                sx={{ borderRadius: 12, mb: 16 }}
              >
                <Button
                  title={item.label}
                  color="white"
                  onPress={item.onPress}
                />
              </Gradient>
            ))
          ) : (
            <TouchableOpacity
              sx={{
                borderRadius: 12,
                bg: '$secondary.500',
                mt: '$4',
                alignItems: 'center',
                py: '$3',
              }}
              onPress={() => closeModal()}
            >
              <Text
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                {t('common.close')}
              </Text>
            </TouchableOpacity>
          )}
        </ViewFooter>
      )}
    </>
  )
}

const ModalBackground = styled(Gradient)({
  borderRadius: 20,
  justifyContent: 'center',
  p: '5%',
  minHeight: 250,
  alignItems: 'center',
})

const TextTitle = styled(Text)({
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 18,
})

const ViewBody = styled(View)({
  mt: 24,
  width: '100%',
})
const ViewFooter = styled(View)({})
export default ModalContent
