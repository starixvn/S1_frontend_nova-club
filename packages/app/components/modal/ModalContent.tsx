import { FONT_TOP_OFFSET } from 'app/constants/font'
import useLocalization from 'app/provider/localization'
import { ScrollView, SxProp, Text, View, styled } from 'dripsy'
import React, { ReactElement } from 'react'
import { GestureResponderEvent } from 'react-native'
import { useModal } from 'react-native-modalfy'
import { DripsyGradient } from '../Gradient'
import Icon from '../Icon'
import Button from '../common/Button'

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
  close?: any
  bodyStyle?: SxProp
}

const ModalContent = ({
  title,
  isShowHeader = true,
  actions,
  children,
  disableAction = false,
  close,
  bodyStyle,
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
            p: ['$2', '$2', '$2', '$3'],
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
          <ViewBody sx={bodyStyle}>{children}</ViewBody>
        </ScrollView>
      </ModalBackground>

      {!disableAction && (
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
            <Button
              onPress={() => {
                close()
              }}
            >
              {t('common.close')}
            </Button>
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
  mt: '$2',
  mb: '$3',
})

const TextTitle = styled(Text)({
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: [16, 16, 16, 17],
  mt: FONT_TOP_OFFSET,
  textTransform: 'uppercase',
})

const ViewBody = styled(View)({
  flex: 1,
  // px: '$pagePadding',
  width: '100%',
  p: ['$2', '$2', '$2', '$3'],
})

const ViewFooter = styled(View)({
  width: '100%',
  alignSelf: 'center',
  mt: '$2',
})
export default ModalContent
