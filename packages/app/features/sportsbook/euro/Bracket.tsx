import { EURO_CUP_STAGE } from 'app/constants/euroCup'
import useLocalization from 'app/provider/localization'
import { Row, Text, View, styled } from 'dripsy'
import React from 'react'
import { useGetEuroCupKnockoutQuery } from 'services/euroApi'
import { SolitoImage } from 'solito/image'

const Bracket = () => {
  const { t } = useLocalization()
  const { stage1, stage2, stage3, stage4 } = useGetEuroCupKnockoutQuery(
    undefined,
    {
      selectFromResult: ({ data }) => ({
        stage1: data?.filter(
          (el) => el.event_name === EURO_CUP_STAGE.ROUND_OF_16
        ),
        stage2: data?.filter(
          (el) => el.event_name === EURO_CUP_STAGE.QUARTER_FINAL
        ),
        stage3: data?.filter(
          (el) => el.event_name === EURO_CUP_STAGE.SEMI_FINAL
        ),
        stage4: data?.filter((el) => el.event_name === EURO_CUP_STAGE.FINAL),
      }),
      refetchOnFocus: true,
    }
  )

  return (
    <Row sx={{ justifyContent: 'space-around' }}>
      <View>
        {stage1?.slice(0, 8).map((item, index) => (
          <TeamBracket
            key={index}
            label={item.team_code ? item.team_code : item.position}
          />
        ))}
        <StageText sx={{ bottom: 0 }}>{t('event.euro.rules.round5')}</StageText>
      </View>

      <View sx={{ justifyContent: 'space-around' }}>
        <View sx={{ justifyContent: 'center' }}>
          {stage2?.slice(0, 2).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}

          <StageText sx={{ right: 0 }}>
            {t('event.euro.rules.round3').replace(' ', '')}
          </StageText>
        </View>
        <View sx={{ justifyContent: 'center' }}>
          {stage2?.slice(2, 4).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}

          <StageText sx={{ right: 0 }}>
            {t('event.euro.rules.round3').replace(' ', '')}
          </StageText>
        </View>
      </View>

      <View sx={{ justifyContent: 'center' }}>
        <View>
          {stage3?.slice(0, 1).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}
        </View>
        <StageText sx={{ right: 0 }}>
          {t('event.euro.rules.round4').replace(' ', '')}
        </StageText>
        <View>
          {stage3?.slice(1, 2).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}
        </View>
      </View>

      <View sx={{ justifyContent: 'center' }}>
        <View>
          {stage4?.slice(0, 1).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}
        </View>
        <View>
          {stage4?.slice(1, 2).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}
        </View>
      </View>

      <View sx={{ justifyContent: 'center' }}>
        <View>
          {stage3?.slice(2, 3).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}
        </View>
        <StageText>{t('event.euro.rules.round4').replace(' ', '')}</StageText>
        <View>
          {stage3?.slice(3, 4).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}
        </View>
      </View>

      <View sx={{ justifyContent: 'space-around' }}>
        <View sx={{ justifyContent: 'center' }}>
          {stage2?.slice(4, 6).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}
          <StageText>{t('event.euro.rules.round3').replace(' ', '')}</StageText>
        </View>
        <View sx={{ justifyContent: 'center' }}>
          {stage2?.slice(6, 8).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}
          <StageText>{t('event.euro.rules.round3').replace(' ', '')}</StageText>
        </View>
      </View>

      <View>
        {stage1?.slice(8).map((item, index) => (
          <TeamBracket
            key={index}
            label={item.team_code ? item.team_code : item.position}
          />
        ))}
        <StageText sx={{ bottom: 0 }}>{t('event.euro.rules.round5')}</StageText>
      </View>
    </Row>
  )
}

const TeamBracket = ({ label }) => {
  const image =
    'https://static-stage.beviking.net/nvclub/sbe/marketing/team_image/Albania_1714450047.png'

  return (
    <Row
      sx={{
        my: '$3',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        bg: '$primaryEuro.500',
        width: 40,
        height: 40,
      }}
    >
      {/* <SolitoImage src={image} alt="" width={28} height={28} /> */}

      <Text>{label}</Text>
    </Row>
  )
}

const StageText = styled(Text)({
  position: 'absolute',
  textTransform: 'uppercase',
  fontSize: 12,
})
export default Bracket
