import { EURO_CUP_STAGE } from 'app/constants/euroCup'
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
      </View>

      <View sx={{ justifyContent: 'space-around' }}>
        <View>
          {stage2?.slice(0, 2).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}
        </View>
        <View>
          {stage2?.slice(2, 4).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}
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
        <View>
          {stage2?.slice(4, 6).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}
        </View>
        <View>
          {stage2?.slice(6, 8).map((item, index) => (
            <TeamBracket
              key={index}
              label={item.team_code ? item.team_code : item.position}
            />
          ))}
        </View>
      </View>

      <View>
        {stage1?.slice(8).map((item, index) => (
          <TeamBracket
            key={index}
            label={item.team_code ? item.team_code : item.position}
          />
        ))}
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
        p: '$1',
        px: '$2',
        my: '$3',
        width: [110, , , , 130],
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
        }}
      >
        <SolitoImage src={image} alt="" width={28} height={28} />
      </View>

      <Text>{label}</Text>
    </Row>
  )
}

export default Bracket
