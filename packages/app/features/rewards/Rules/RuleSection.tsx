import SectionHeader from 'app/components/SectionHeader'
import useLocalization from 'app/provider/localization'
import { Text, View, styled } from 'dripsy'
import { REWARD_GENERAL_RULE_NOTES } from 'utils/constant'

const RuleSection = () => {
  const { t } = useLocalization()
  return (
    <View>
      <SectionHeader
        icon="exclaimation"
        title={t('rewards.rule.title').toUpperCase()}
        titleProps={{
          sx: {
            fontSize: 16,
          },
        }}
      />
      <View sx={{ width: '80%', alignSelf: 'center', mt: 20 }}>
        {REWARD_GENERAL_RULE_NOTES.map((e, i) => {
          return (
            <View key={i} sx={{ flexDirection: 'row' }}>
              <ContentText>{i + 1}. </ContentText>
              <ContentText sx={{ mb: '$2' }}>{t(e)}</ContentText>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const ContentText = styled(Text)({
  fontSize: 15,
})

export default RuleSection
