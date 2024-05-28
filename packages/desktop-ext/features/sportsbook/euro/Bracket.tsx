import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { KNOCKOUT_STAGE } from 'app/constants/euroCup'
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
          (el) => el.event_name === KNOCKOUT_STAGE.ROUND_OF_16
        ),
        stage2: data?.filter(
          (el) => el.event_name === KNOCKOUT_STAGE.QUARTER_FINAL
        ),
        stage3: data?.filter(
          (el) => el.event_name === KNOCKOUT_STAGE.SEMI_FINAL
        ),
        stage4: data?.filter((el) => el.event_name === KNOCKOUT_STAGE.FINAL),
      }),
      refetchOnFocus: true,
    }
  )

  return (
    <Row sx={{ justifyContent: 'space-between' }}>
      <View>
        <StageText sx={{ top: -10 }}>
          {t('event.euro.knockout.stage1')}
        </StageText>
        {stage1?.slice(0, 8).map((item, index) => (
          <TeamBracket
            key={index}
            image={item.team_img}
            label={item.team_name}
          />
        ))}
      </View>

      <View sx={{ justifyContent: 'space-around' }}>
        <StageText sx={{ top: 35 }}>
          {t('event.euro.knockout.stage2')}
        </StageText>
        <QuarterFinal
          teams={stage2?.slice(0, 2)}
          topBracketStyle={{
            top: -38,
            left: -45,
          }}
          bottomBracketStyle={{
            top: 105,
            left: -45,
            transform: [{ scaleY: -1 }],
          }}
        />
        <QuarterFinal
          teams={stage2?.slice(2, 4)}
          topBracketStyle={{
            top: -38,
            left: -45,
          }}
          bottomBracketStyle={{
            top: 105,
            left: -45,
            transform: [{ scaleY: -1 }],
          }}
        />
      </View>

      <View sx={{ justifyContent: 'center', ml: -50 }}>
        <StageText>{t('event.euro.knockout.stage3')}</StageText>
        <SemiFinal
          teams={stage3?.slice(0, 2)}
          topBracketStyle={{
            top: -114,
            left: 5,
          }}
          bottomBracketStyle={{
            top: 132,
            left: 5,
            transform: [{ scaleY: -1 }],
          }}
        />
      </View>

      <View sx={{ justifyContent: 'center' }}>
        <Final teams={stage4?.slice(0, 2)} />
      </View>

      <View sx={{ justifyContent: 'center', mr: -50 }}>
        <StageText>{t('event.euro.knockout.stage3')}</StageText>
        <SemiFinal
          teams={stage3?.slice(2, 4)}
          topBracketStyle={{
            transform: [{ scaleX: -1 }],
            top: -114,
            right: 5,
          }}
          bottomBracketStyle={{
            transform: [{ scale: -1 }],
            top: 132,
            right: 5,
          }}
        />
      </View>

      <View sx={{ justifyContent: 'space-around' }}>
        <StageText sx={{ top: 35 }}>
          {t('event.euro.knockout.stage2')}
        </StageText>
        <QuarterFinal
          teams={stage2?.slice(4, 6)}
          topBracketStyle={{
            transform: [{ scaleX: -1 }],
            top: -38,
            left: 55,
          }}
          bottomBracketStyle={{
            transform: [{ scale: -1 }],
            top: 105,
            left: 55,
          }}
        />
        <QuarterFinal
          teams={stage2?.slice(6, 8)}
          topBracketStyle={{
            transform: [{ scaleX: -1 }],
            top: -38,
            left: 55,
          }}
          bottomBracketStyle={{
            transform: [{ scale: -1 }],
            top: 105,
            left: 55,
          }}
        />
      </View>

      <View>
        <StageText sx={{ top: -10 }}>
          {t('event.euro.knockout.stage1')}
        </StageText>
        {stage1?.slice(8).map((item, index) => (
          <TeamBracket
            key={index}
            image={item.team_img}
            label={item.team_name}
          />
        ))}
      </View>
    </Row>
  )
}

const QuarterFinal = ({ teams, topBracketStyle, bottomBracketStyle }) => (
  <View>
    <SolitoImage
      src={require('app/assets/images/events/euro/DT/line1.png')}
      contentFit="fill"
      width={110}
      height={80}
      alt=""
      style={{
        position: 'absolute',
        ...topBracketStyle,
      }}
    />
    {teams?.map((item, index) => (
      <TeamBracket key={index} image={item.team_img} label={item.team_name} />
    ))}
    <SolitoImage
      src={require('app/assets/images/events/euro/DT/line1.png')}
      contentFit="fill"
      width={110}
      height={80}
      alt=""
      style={{
        position: 'absolute',
        ...bottomBracketStyle,
      }}
    />
  </View>
)

const SemiFinal = ({ teams, topBracketStyle, bottomBracketStyle }) => (
  <View>
    <SolitoImage
      src={require('app/assets/images/events/euro/DT/line2.png')}
      contentFit="fill"
      width={50}
      height={130}
      alt=""
      style={{
        position: 'absolute',
        ...topBracketStyle,
      }}
    />
    {teams?.map((item, index) => (
      <TeamBracket key={index} image={item.team_img} label={item.team_name} />
    ))}
    <SolitoImage
      src={require('app/assets/images/events/euro/DT/line2.png')}
      contentFit="fill"
      width={50}
      height={130}
      alt=""
      style={{
        position: 'absolute',
        ...bottomBracketStyle,
      }}
    />
  </View>
)

const Final = ({ teams }) => (
  <View>
    <SolitoImage
      src={require('app/assets/images/events/euro/DT/line3.png')}
      contentFit="fill"
      width={50}
      height={80}
      alt=""
      style={{
        position: 'absolute',
        top: 35,
        left: -45,
      }}
    />
    {teams?.map((item, index) => (
      <TeamBracket key={index} image={item.team_img} label={item.team_name} />
    ))}
    <SolitoImage
      src={require('app/assets/images/events/euro/DT/line4.png')}
      contentFit="fill"
      width={50}
      height={80}
      alt=""
      style={{
        position: 'absolute',
        top: 35,
        left: 120,
      }}
    />
  </View>
)

const TeamBracket = ({ image, label }) => {
  return (
    <Row
      sx={{
        p: '$1',
        px: '$1',
        my: '$3',
        width: [120],
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        bg: '$primaryEuro.500',
        minHeight: 42,
      }}
    >
      {image ? (
        <View
          sx={{
            borderRadius: 50,
            borderWidth: 1,
            borderColor: 'white',
            mr: '$1',
            width: 28,
            height: 28,
          }}
        >
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${image}`}
            alt=""
            fill
          />
        </View>
      ) : null}
      <Text sx={{ fontSize: 12, fontWeight: 'bold' }}>{label}</Text>
    </Row>
  )
}

const StageText = styled(Text)({
  position: 'absolute',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: 12,
  minWidth: 80,
  left: 0,
  right: 0,
  textAlign: 'center',
})

export default Bracket
