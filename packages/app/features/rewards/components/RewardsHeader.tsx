import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Header from 'app/components/common/Header'
import { FONT_TOP_OFFSET } from 'app/constants/font'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { ActivityIndicator, Row, Text } from 'dripsy'
import React from 'react'
import { useGetCoinQuery } from 'services/rewardApi'
import { SolitoImage } from 'solito/image'
import { useRouter } from 'solito/router'

type Props = {}

export default function RewardsHeader({}: Props) {
  const { t } = useLocalization()
  const { push } = useRouter()
  return (
    <Header
      title={t('menu.rewardsHub')}
      actions={<CoinHeaderDisplay />}
      leftAligned
      customBack={() => {
        push('/')
      }}
    />
  )
}

const COIN_SIZE = 32
const CoinHeaderDisplay = () => {
  const { data } = useGetCoinQuery()

  return (
    <Row
      sx={{
        borderWidth: 1,
        borderColor: '$primary.100',
        borderRadius: 20,
        alignItems: 'center',
        height: 28,
        pr: '$1',
        pl: COIN_SIZE - 5,
      }}
    >
      <SolitoImage
        style={{ position: 'absolute', left: -5 }}
        alt="Vui Coin"
        width={COIN_SIZE}
        height={COIN_SIZE}
        src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/coin.png`}
      />
      {data != null ? (
        <Text
          sx={{
            px: '$2',
            mt: FONT_TOP_OFFSET,
            fontWeight: 'bold',
            color: '$secondary.100',
            fontSize: 14,
          }}
        >
          {toThousandSeparator(data)}
        </Text>
      ) : (
        <ActivityIndicator
          size={'small'}
          color="$primary.100"
          sx={{
            px: '$2',
          }}
        />
      )}
    </Row>
  )
}
