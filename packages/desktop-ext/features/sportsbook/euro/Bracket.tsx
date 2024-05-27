import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { KNOCKOUT_STAGE } from 'app/constants/euroCup'
import { Row, Text, View } from 'dripsy'
import React from 'react'
import { useGetEuroCupKnockoutQuery } from 'services/euroApi'
import { SolitoImage } from 'solito/image'

const Bracket = () => {
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
        {stage1?.slice(0, 8).map((item, index) => (
          <TeamBracket
            key={index}
            image={item.team_img}
            label={item.team_code ? item.team_code : item.position}
          />
        ))}
      </View>

      <View sx={{ justifyContent: 'space-around' }}>
        <QuarterFinal
          teams={stage2?.slice(0, 2)}
          topBracketStyle={{
            top: -38,
            left: -55,
          }}
          bottomBracketStyle={{
            top: 105,
            left: -55,
            transform: [{ scaleY: -1 }],
          }}
        />
        <QuarterFinal
          teams={stage2?.slice(2, 4)}
          topBracketStyle={{
            top: -38,
            left: -55,
          }}
          bottomBracketStyle={{
            top: 105,
            left: -55,
            transform: [{ scaleY: -1 }],
          }}
        />
      </View>

      <View sx={{ justifyContent: 'center', ml: -50 }}>
        <SemiFinal
          teams={stage3?.slice(0, 2)}
          topBracketStyle={{
            top: -114,
            left: -5,
          }}
          bottomBracketStyle={{
            top: 130,
            left: -5,
            transform: [{ scaleY: -1 }],
          }}
        />
      </View>

      <View sx={{ justifyContent: 'center' }}>
        <Final teams={stage4?.slice(0, 2)} />
      </View>

      <View sx={{ justifyContent: 'center', mr: -50 }}>
        <SemiFinal
          teams={stage3?.slice(2, 4)}
          topBracketStyle={{
            transform: [{ scaleX: -1 }],
            top: -114,
            right: -5,
          }}
          bottomBracketStyle={{
            transform: [{ scale: -1 }],
            top: 130,
            right: -5,
          }}
        />
      </View>

      <View sx={{ justifyContent: 'space-around' }}>
        <QuarterFinal
          teams={stage2?.slice(4, 6)}
          topBracketStyle={{
            transform: [{ scaleX: -1 }],
            top: -38,
            left: 65,
          }}
          bottomBracketStyle={{
            transform: [{ scale: -1 }],
            top: 105,
            left: 65,
          }}
        />
        <QuarterFinal
          teams={stage2?.slice(6, 8)}
          topBracketStyle={{
            transform: [{ scaleX: -1 }],
            top: -38,
            left: 65,
          }}
          bottomBracketStyle={{
            transform: [{ scale: -1 }],
            top: 105,
            left: 65,
          }}
        />
      </View>

      <View>
        {stage1?.slice(8).map((item, index) => (
          <TeamBracket
            key={index}
            image={item.team_img}
            label={item.team_code ? item.team_code : item.position}
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
      width={100}
      height={80}
      alt=""
      style={{
        position: 'absolute',
        ...topBracketStyle,
      }}
    />
    {teams?.map((item, index) => (
      <TeamBracket
        key={index}
        image={item.team_img}
        label={item.team_code ? item.team_code : item.position}
      />
    ))}
    <SolitoImage
      src={require('app/assets/images/events/euro/DT/line1.png')}
      contentFit="fill"
      width={100}
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
      <TeamBracket
        key={index}
        image={item.team_img}
        label={item.team_code ? item.team_code : item.position}
      />
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
      width={55}
      height={80}
      alt=""
      style={{
        position: 'absolute',
        top: 35,
        left: -55,
      }}
    />
    {teams?.map((item, index) => (
      <TeamBracket
        key={index}
        image={item.team_img}
        label={item.team_code ? item.team_code : item.position}
      />
    ))}
    <SolitoImage
      src={require('app/assets/images/events/euro/DT/line4.png')}
      contentFit="fill"
      width={55}
      height={80}
      alt=""
      style={{
        position: 'absolute',
        top: 35,
        left: 110,
      }}
    />
  </View>
)

const TeamBracket = ({ image, label }) => {
  return (
    <Row
      sx={{
        p: '$1',
        px: '$2',
        my: '$3',
        width: [110],
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
        bg: '$primaryEuro.500',
      }}
    >
      <View
        sx={{
          borderRadius: 50,
          borderWidth: 1,
          borderColor: 'white',
          mr: '$2',
          width: 30,
          height: 30,
        }}
      >
        {image ? (
          <SolitoImage
            src={`${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${image}`}
            alt=""
            fill
          />
        ) : null}
      </View>

      <Text>{label}</Text>
    </Row>
  )
}

export default Bracket
