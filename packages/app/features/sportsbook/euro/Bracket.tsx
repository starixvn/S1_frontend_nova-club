import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { KNOCKOUT_STAGE } from 'app/constants/euroCup'
import useLocalization from 'app/provider/localization'
import { Row, SxProp, Text, View, styled, useResponsiveValue } from 'dripsy'
import React from 'react'
import { useGetEuroCupKnockoutQuery } from 'services/euroApi'
import { EuroCupKnockout } from 'services/euroApi.type'
import { SolitoImage } from 'solito/image'

type StageProps = {
  teams?: EuroCupKnockout[]
  topBracketStyle?: SxProp
  bottomBracketStyle?: SxProp
  textStyle?: SxProp
}

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
    <Row sx={{ justifyContent: 'space-between', width: [400, 500] }}>
      <View sx={{ zIndex: 3 }}>
        {stage1?.slice(0, 8).map((item, index) => (
          <TeamBracket
            key={index}
            image={item.team_img}
            label={item.position}
          />
        ))}
        <StageText sx={{ bottom: -12 }}>
          {t('event.euro.knockout.stage1')}
        </StageText>
      </View>

      <View sx={{ justifyContent: 'space-around', zIndex: 2 }}>
        <QuarterFinal
          teams={stage2?.slice(0, 2)}
          topBracketStyle={{
            top: -37,
            left: [-20, -30],
          }}
          bottomBracketStyle={{
            transform: [{ scaleY: -1 }],
            top: 102,
            left: [-20, -30],
          }}
          textStyle={{ right: 0, textAlign: 'right' }}
        />
        <QuarterFinal
          teams={stage2?.slice(2, 4)}
          topBracketStyle={{
            top: -37,
            left: [-20, -30],
          }}
          bottomBracketStyle={{
            transform: [{ scaleY: -1 }],
            top: 102,
            left: [-20, -30],
          }}
          textStyle={{ right: 0, textAlign: 'right' }}
        />
      </View>

      <View sx={{ justifyContent: 'center', zIndex: 1 }}>
        <SemiFinal
          teams={stage3?.slice(0, 2)}
          topBracketStyle={{
            top: -110,
            left: [-14, -30],
          }}
          bottomBracketStyle={{
            transform: [{ scaleY: -1 }],
            top: 127,
            left: [-14, -30],
          }}
          textStyle={{ right: 0, textAlign: 'right' }}
        />
      </View>

      <View sx={{ justifyContent: 'center', mx: 20, zIndex: 0 }}>
        <Final teams={stage4?.slice(0, 2)} />
      </View>

      <View sx={{ justifyContent: 'center', zIndex: 1 }}>
        <SemiFinal
          teams={stage3?.slice(2, 4)}
          topBracketStyle={{
            transform: [{ scaleX: -1 }],
            top: -110,
            left: [18, 21],
          }}
          bottomBracketStyle={{
            transform: [{ scale: -1 }],
            top: 127,
            left: [18, 21],
          }}
          textStyle={{ left: 0, textAlign: 'left' }}
        />
      </View>

      <View sx={{ justifyContent: 'space-around', zIndex: 2 }}>
        <QuarterFinal
          teams={stage2?.slice(4, 6)}
          topBracketStyle={{
            transform: [{ scaleX: -1 }],
            top: -37,
            left: 20,
          }}
          bottomBracketStyle={{
            transform: [{ scale: -1 }],
            top: 102,
            left: 20,
          }}
          textStyle={{ left: 0, textAlign: 'left' }}
        />
        <QuarterFinal
          teams={stage2?.slice(6, 8)}
          topBracketStyle={{
            transform: [{ scaleX: -1 }],
            top: -37,
            left: 20,
          }}
          bottomBracketStyle={{
            transform: [{ scale: -1 }],
            top: 102,
            left: 20,
          }}
          textStyle={{ left: 0, textAlign: 'left' }}
        />
      </View>

      <View sx={{ zIndex: 3 }}>
        {stage1?.slice(8).map((item, index) => (
          <TeamBracket
            key={index}
            image={item.team_img}
            label={item.position}
          />
        ))}
        <StageText sx={{ bottom: -12, right: 0, textAlign: 'right' }}>
          {t('event.euro.knockout.stage1')}
        </StageText>
      </View>
    </Row>
  )
}

const QuarterFinal = ({
  teams = [],
  topBracketStyle,
  bottomBracketStyle,
  textStyle,
}: StageProps) => {
  const { t } = useLocalization()
  const width = useResponsiveValue([40, 50])

  return (
    <View sx={{ justifyContent: 'center' }}>
      <StyledImage
        src={require('app/assets/images/events/euro/H5/line1.png')}
        contentFit="fill"
        width={width}
        height={78}
        alt=""
        sx={{
          position: 'absolute',
          ...topBracketStyle,
        }}
      />
      {teams.map((item, index) => (
        <TeamBracket key={index} image={item.team_img} label={item.position} />
      ))}

      <StyledImage
        src={require('app/assets/images/events/euro/H5/line1.png')}
        contentFit="fill"
        width={width}
        height={78}
        alt=""
        sx={{
          position: 'absolute',
          ...bottomBracketStyle,
        }}
      />
      <StageText sx={textStyle}>
        {t('event.euro.knockout.stage2').replace(' ', '')}
      </StageText>
    </View>
  )
}

const SemiFinal = ({
  teams = [],
  topBracketStyle,
  bottomBracketStyle,
  textStyle,
}: StageProps) => {
  const { t } = useLocalization()
  const width = useResponsiveValue([35, 50])

  return (
    <View sx={{ justifyContent: 'center' }}>
      <StyledImage
        src={require('app/assets/images/events/euro/H5/line2.png')}
        contentFit="fill"
        width={width}
        height={128}
        alt=""
        sx={{
          position: 'absolute',
          zIndex: 0,
          ...topBracketStyle,
        }}
      />
      {teams.map((item, index) => (
        <TeamBracket key={index} image={item.team_img} label={item.position} />
      ))}

      <StyledImage
        src={require('app/assets/images/events/euro/H5/line2.png')}
        contentFit="fill"
        width={width}
        height={128}
        alt=""
        sx={{
          position: 'absolute',
          ...bottomBracketStyle,
        }}
      />
      <StageText sx={textStyle}>
        {t('event.euro.knockout.stage3').replace(' ', '')}
      </StageText>
    </View>
  )
}

const Final = ({ teams = [] }: StageProps) => {
  const width = useResponsiveValue([38, 50])

  return (
    <View>
      <StyledImage
        src={require('app/assets/images/events/euro/H5/line3.png')}
        contentFit="fill"
        width={width}
        height={80}
        alt=""
        sx={{
          position: 'absolute',
          top: 30,
          left: [-35, -50],
        }}
      />
      {teams.map((item, index) => (
        <TeamBracket key={index} image={item.team_img} label={item.position} />
      ))}
      <StyledImage
        src={require('app/assets/images/events/euro/H5/line4.png')}
        contentFit="fill"
        width={width}
        height={80}
        alt=""
        sx={{
          position: 'absolute',
          top: 34,
          left: [35, 40],
        }}
      />
    </View>
  )
}

const TeamBracket = ({ image, label }) => {
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
        zIndex: 1,
      }}
    >
      {image ? (
        <SolitoImage
          src={`${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${image}`}
          alt=""
          width={28}
          height={28}
        />
      ) : (
        <Text>{label}</Text>
      )}
    </Row>
  )
}

const StyledImage = styled(SolitoImage)({})

const StageText = styled(Text)({
  position: 'absolute',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  fontSize: 12,
  minWidth: 80,
  mt: 4,
})
export default Bracket
