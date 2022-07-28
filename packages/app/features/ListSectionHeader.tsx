import { DripsyGradient } from 'app/components/Gradient'
import { DripsyIcon } from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { styled, Text, View } from 'dripsy'
import { motify } from 'moti'
import React from 'react'

const MotifyIcon = motify(DripsyIcon)()

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
        <StyledGradient gradient={bgColor}></StyledGradient>
        <StyledText>{t(title)}</StyledText>
        <MotifyIcon
          sx={{ left: 20, position: 'absolute' }}
          color={'white'}
          from={{
            transform: [
              {
                translateY: -100,
              },
              {
                rotate: '1440deg',
              },
              {
                scale: 0.5,
              },
            ],
          }}
          animate={{
            transform: [
              {
                translateY: [-5, 0],
              },
              {
                rotate: 0,
              },
              {
                scale: [0.8, 1],
              },
            ],
          }}
          name={iconName}
          size={20}
        />
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
  alignItems: 'center',
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
  position: 'relative',
})

const StyledText = styled(Text)({
  fontSize: [17, 20],
  color: 'white',
  padding: '$1a',
  pl: '$1a',
  pr: '$5',
  fontWeight: 900,
  textTransform: 'capitalize',
})

const StyledGradient = styled(DripsyGradient)({
  borderRadius: 15,
  width: 30,
  height: 30,
  ml: 15,
  my: '$1',
})

const StyledSearchBox = styled(View)({
  borderRadius: 20,
  bg: 'rgb(48,89,117)',
  width: [130, 150],
  height: [40, 40],
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderWidth: 2,
  borderColor: '$background',
  mr: '$1a',
})

export default ListSectionHeader
