import { useNavigation } from '@react-navigation/native'
import { styled, Text, View } from 'dripsy'
import React, { FC } from 'react'
import { Linking, TouchableWithoutFeedback } from 'react-native'
import Icon from './Icon'

interface ImportantNoticeProps {
  keys: string[]
  module: string
}

const FONT_SIZE = 13
const LIVE_CHAT_URL = ''

const ImportantNotice = ({ keys, module }: ImportantNoticeProps) => {
  return (
    <StyledView>
      <StyledViewTitle>
        <Icon name="information-solid" color="#134dae" sx={{ mr: '$1' }} />
        <StyledTextTitle>
          {'note.importantNotice'.toUpperCase()}
        </StyledTextTitle>
      </StyledViewTitle>
      {keys.map((k, i) => {
        const splits = k.split('|')

        return (
          <StyledViewContent key={`${module}.row${i}`}>
            <StyledTextListNumber>{i + 1 + '.'}</StyledTextListNumber>
            <Text sx={{ fontSize: FONT_SIZE }}>
              {splits.map((text: string, ti: number) => {
                const isBold = text.includes('${bold}')
                const isLiveChat = text.includes('${livechat}')

                const content = text.replace('${bold}', '')
                if (isLiveChat)
                  return (
                    <TouchableWithoutFeedback
                      key={`${module}.row${i}.text${ti}`}
                      onPress={() => {
                        Linking.openURL(LIVE_CHAT_URL)
                      }}
                    >
                      <StyledTextListLiveChat>
                        {'note.livechat'}
                      </StyledTextListLiveChat>
                    </TouchableWithoutFeedback>
                  )

                return (
                  <StyledTextListContent
                    key={`${module}.row${i}.text${ti}`}
                    isBold={isBold}
                  >
                    {content}
                  </StyledTextListContent>
                )
              })}
            </Text>
          </StyledViewContent>
        )
      })}
    </StyledView>
  )
}

const StyledView = styled(View)(() => ({
  padding: '$2',
  borderRadius: 'sm',
}))

const StyledViewTitle = styled(View)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  mb: '$2',
}))

const StyledTextTitle = styled(Text)(() => ({
  fontSize: FONT_SIZE,
  fontWeight: 'bold',
}))

const StyledViewContent = styled(View)(() => ({
  ml: 2,
  mt: 1,
  pl: 2.5,
  flexDirection: 'row',
}))

const StyledTextListNumber = styled(Text)(() => ({
  fontSize: FONT_SIZE,
  mr: 12,
}))

const StyledTextListLiveChat = styled(Text)(() => ({
  fontSize: FONT_SIZE,
  fontWeight: 'bold',
  color: '#134dae',
}))

const StyledTextListContent = styled(Text)(
  ({ isBold }: { isBold: boolean }) => ({
    fontSize: FONT_SIZE,
    fontWeight: isBold ? 'bold' : 'normal',
  })
)

export default ImportantNotice
