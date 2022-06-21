import GradientBox from 'app/components/GradientBox'
import Icon from 'app/components/Icon'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { styled, Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'

const ProfileOverview = () => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const { push } = useRouter()
  return (
    <StyledGradientBox>
      <StyledOverView>
        <Text sx={{ fontWeight: 'bold' }}>
          {t('profile.overview.title').toUpperCase()}
        </Text>
        <BouncePressable
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => push('/profile/overview')}
        >
          <Text
            sx={{
              color: theme.colors.$lightCyan,
            }}
          >
            More
          </Text>
          <Icon name="chevdown" size={24} color={theme.colors.$lightCyan} />
        </BouncePressable>
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
  p: '$3',
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
  alignItems: 'center',
}))

const StyledValueText = styled(Text)(() => ({
  fontSize: 28,
  fontWeight: 'bold',
  color: '$PaleBlue',
  py: 12,
}))

export default ProfileOverview
