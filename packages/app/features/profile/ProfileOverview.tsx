import IconButton from 'app/components/form/IconButton'
import GradientBox from 'app/components/GradientBox'
import { Pressable, styled, Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'

const ProfileOverview = () => {
  const { theme } = useDripsyTheme()

  return (
    <StyledGradientBox>
      <StyledOverView>
        <Text sx={{ fontWeight: 'bold' }}>OVERVIEW</Text>
        <Pressable
          sx={{ flexDirection: 'row' }}
          onPress={() => console.log('click more')}
        >
          <Text
            sx={{
              color: theme.colors.$lightCyan,
            }}
          >
            More
          </Text>
          <IconButton
            _icon={{
              name: 'chevdown',
              size: 24,
              color: theme.colors.$lightCyan,
            }}
          />
        </Pressable>
      </StyledOverView>
      <StyledItemViewWrapper>
        <OverviewItem title="Registered" value={0} />
        <OverviewItem title="Active" value={0} />
        <OverviewItem title="Turnover" value={0} />
      </StyledItemViewWrapper>
    </StyledGradientBox>
  )
}

const OverviewItem = ({ title, value }: { title: string; value: number }) => {
  return (
    <StyledItemView>
      <StyledValueText>{value}</StyledValueText>
      <Text>{title}</Text>
    </StyledItemView>
  )
}

const StyledGradientBox = styled(GradientBox)(() => ({
  minHeight: 100,
  p: '$6',
}))

const StyledOverView = styled(View)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
}))

const StyledItemViewWrapper = styled(View)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
}))

const StyledItemView = styled(View)(() => ({
  flex: 1,
  textAlign: 'center',
}))

const StyledValueText = styled(Text)(() => ({
  fontSize: 28,
  fontWeight: 'bold',
  color: '$PaleBlue',
  py: 12,
}))

export default ProfileOverview
