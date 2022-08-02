import { useNavigation } from '@react-navigation/native'
import useLocalization from 'app/provider/localization'
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
  const { t } = useLocalization()

  return (
    <StyledView>
      <StyledViewTitle>
        <Icon name="alert" color="$yellow" sx={{ mr: '$2' }} />
        <StyledTextTitle>
          {t('notes.importantNotice').toUpperCase()}
        </StyledTextTitle>
      </StyledViewTitle>

      <View sx={{ flex: 1 }}>
        {keys.map((content, i) => {
          return (
            <StyledViewContent key={`${module}.row${i}`}>
              <StyledTextListNumber>{i + 1 + '.'}</StyledTextListNumber>
              {/* <View sx={{ width: 12 }} /> */}
              <StyledTextListContent key={`${module}.row${i}`}>
                {t(content)}
              </StyledTextListContent>
            </StyledViewContent>
          )
        })}
      </View>
    </StyledView>
  )
}

const StyledView = styled(View)(() => ({
  p: '$4',
  my: '$4',
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
  flexDirection: 'row',
  mb: '$1',
}))

const StyledTextListNumber = styled(Text)(() => ({
  fontSize: FONT_SIZE,
  mr: 12,
}))

const StyledTextListContent = styled(Text)({
  fontSize: FONT_SIZE,
  flex: 1,
})

export default ImportantNotice
