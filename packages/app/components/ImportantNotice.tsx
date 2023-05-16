import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import React from 'react'
import Collapse from './Accordian'

interface ImportantNoticeProps {
  keys: string[]
  module: string
  isExpandable?: boolean
}

const FONT_SIZE = 13
const LIVE_CHAT_URL = ''

const ImportantNotice = ({
  keys,
  module,
  isExpandable,
}: ImportantNoticeProps) => {
  const { t } = useLocalization()

  return (
    <StyledView>
      <Collapse
        isExpandable
        label={
          <StyledViewTitle>
            {/* <Icon name="alert" color="$yellow" sx={{ mr: '$2' }} /> */}
            <StyledTextTitle>
              {t('notes.importantNotice').toUpperCase()}
            </StyledTextTitle>
          </StyledViewTitle>
        }
      >
        <View sx={{ p: '$3' }}>
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
      </Collapse>
    </StyledView>
  )
}

const StyledView = styled(View)(() => ({
  m: '$4',
  borderWidth: 1,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  borderColor: '$borderBlue',
  overflow: 'hidden',
}))

const StyledViewTitle = styled(View)(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

const StyledTextTitle = styled(Text)(() => ({
  fontSize: FONT_SIZE,
  fontWeight: 'bold',
  color: '#FFEE00',
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
