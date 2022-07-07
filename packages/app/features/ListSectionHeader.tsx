import { DripsyGradient } from 'app/components/Gradient'
import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { styled, Text, TextInput, View } from 'dripsy'
import React from 'react'

const ListSectionHeader = ({
  title,
  bgColor,
  iconName,
  search,
  children,
}: {
  title: string
  bgColor: string
  iconName: string
  search?: boolean
  children?: React.ReactElement
}) => {
  const { t } = useLocalization()

  return (
    <StyledContainer>
      <StyledView>
        <StyledGradient gradient={bgColor}>
          <Icon
            name={iconName}
            size={15}
            sx={{
              color: 'white',
            }}
          />
        </StyledGradient>
        <StyledText>{t(title)}</StyledText>
      </StyledView>
      {children}
      {/* {search && (
        <StyledSearchBox>
          <TextInput sx={{ width: '80%', height: '100%', pl: '$2a' }} />
          <Icon
            name="lc"
            sx={{ alignSelf: 'center', pr: '$1a' }}
            color={'white'}
            size={15}
          />
        </StyledSearchBox>
      )} */}
    </StyledContainer>
  )
}

const StyledContainer = styled(View)({
  mt: ['$2a', '$4'],
  mb: ['$4', '$6'],
  flexDirection: 'row',
  justifyContent: 'space-between',
})

const StyledView = styled(View)({
  bg: '$primary',
  borderTopRightRadius: 30,
  borderBottomRightRadius: 30,
  borderWidth: 2,
  borderLeftColor: '$primary',
  borderColor: '$shadow',
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'flex-start',
})

const StyledText = styled(Text)({
  fontSize: [17, 20],
  color: 'white',
  padding: '$1a',
  pl: '$1a',
  pr: '$5',
  fontWeight: 'bold',
  fontStyle: 'italic',
})

const StyledGradient = styled(DripsyGradient)({
  borderRadius: 10,
  padding: '$0a',
  ml: '$4',
})

const StyledSearchBox = styled(View)({
  borderRadius: 20,
  bg: 'rgb(48,89,117)',
  width: [130, 150],
  height: [35, 40],
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderWidth: 2,
  borderColor: '$background',
  mr: '$1a',
})

export default ListSectionHeader
