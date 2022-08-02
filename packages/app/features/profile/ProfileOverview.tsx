import { Gradient } from '@dripsy/gradient'
import GradientBox from 'app/components/GradientBox'
import Icon from 'app/components/Icon'
import useContextualRouting from 'app/hooks/useContextualRouting'
import BouncePressable from 'app/pressable/BouncePressable'
import useLocalization from 'app/provider/localization'
import { styled, Text, useDripsyTheme, View } from 'dripsy'
import React from 'react'
import { useRouter } from 'solito/router'

const ProfileOverview = () => {
  const { t } = useLocalization()
  const { theme } = useDripsyTheme()
  const { push } = useRouter()

  const { makeContextualHref } = useContextualRouting()
  const toOverview = makeContextualHref('/profile/overview')

  return (
    <Gradient
      colors={['#033454', 'rgb(13, 32, 53)']}
      sx={{ minHeight: 100, p: '$3' }}
    >
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
          onPress={() => push(toOverview, '/profile/overview')}
        >
          <Text
            sx={{
              color: theme.colors.$lightCyan,
              mr: '$1',
            }}
          >
            {t('common.more')}
          </Text>
          <Icon
            name="chevright"
            size={16}
            color={theme.colors.$lightCyan}
            sx={{ mt: 3 }}
          />
        </BouncePressable>
      </StyledOverView>
      <StyledItemViewWrapper>
        <OverviewItem title={t('common.registered')} value={0} />
        <OverviewItem title={t('common.active')} value={0} />
        <OverviewItem title={t('common.turnover')} value={0} />
      </StyledItemViewWrapper>
    </Gradient>
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
