import Icon from 'app/components/Icon'
import useIsDesktop from 'app/hooks/useIsDesktop'
import useLocalization from 'app/provider/localization'
import { Row, Text, View, styled, useResponsiveValue } from 'dripsy'
import React from 'react'

type RulesCardProps = {
  background: string
  title: string
  period: string
  note: string
  note2?: string
  active?: boolean
}

const RulesCard = ({
  background,
  title,
  period,
  note,
  note2,
  active = true,
}: RulesCardProps) => {
  const { t } = useLocalization()
  const isDesktop = useIsDesktop()

  return (
    <View
      sx={{
        bg: background,
        height: isDesktop ? '100%' : undefined,
        borderRadius: 12,
        py: '$2',
        px: '$3',
        my: '$2',
      }}
    >
      <View>
        <TitleText>{title}</TitleText>
        <PeriodText>
          {t('event.euro.rules.period', { period: period })}
        </PeriodText>
      </View>

      <View
        sx={{
          height: 0.8,
          bg: 'white',
          width: '100%',
          my: '$2',
          opacity: 0.5,
        }}
      />

      <View sx={{ flexDirection: isDesktop ? 'row' : 'column', gap: '$3' }}>
        <NoteText>{note}</NoteText>
        {note2 && <NoteText sx={{ color: '#F7FFB9' }}>{note2}</NoteText>}
      </View>
    </View>
  )
}

const TitleText = styled(Text)({ fontWeight: 'bold', fontSize: 16 })
const PeriodText = styled(Text)({
  fontSize: 14,
  color: '#FFFF46',
  fontWeight: 'bold',
})
const NoteText = styled(Text)({ fontSize: 12, flex: 1 })
const TicketText = styled(Text)({ fontSize: 14 })

export default RulesCard
