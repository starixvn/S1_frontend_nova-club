import { ScrollView, Text, View, styled, useDripsyTheme } from 'dripsy'
import React from 'react'
import { Gradient } from 'dripsy/gradient'
import { Button } from 'react-native'
import { useModal } from 'react-native-modalfy'
import Icon from '../Icon'

const ModalContent = ({ title, isShowHeader = true, actions, children }) => {
  const { theme } = useDripsyTheme()
  const { closeModal } = useModal()
  const TITLE = 'Important Notice'

  return (
    <>
      <ModalBackground colors={theme.linearGradients.surface}>
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
              <Icon name="notice" color="white" sx={{ mr: 12 }} />
              <TextTitle>{TITLE.toUpperCase()}</TextTitle>
            </View>
          ))}
        <ScrollView>
          <ViewBody>{children}</ViewBody>
        </ScrollView>
      </ModalBackground>

      <ViewFooter>
        {actions ? (
          actions.map((item) => (
            <Gradient
              key={item.label}
              colors={theme.linearGradients.surface}
              sx={{ borderRadius: 12, mb: 16 }}
            >
              <Button title={item.label} color="white" onPress={item.onPress} />
            </Gradient>
          ))
        ) : (
          <Gradient
            colors={theme.linearGradients.surface}
            sx={{ borderRadius: 12 }}
          >
            <Button title="Close" color="white" onPress={() => closeModal()} />
          </Gradient>
        )}
      </ViewFooter>
    </>
  )
}

const ModalBackground = styled(Gradient)({
  borderRadius: 20,
  justifyContent: 'center',
  p: 24,
  mb: 24,
})

const TextTitle = styled(Text)({
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
})

const ViewBody = styled(View)({
  mt: 24,
  width: '100%',
  minHeight: 120,
})
const ViewFooter = styled(View)({})
export default ModalContent
