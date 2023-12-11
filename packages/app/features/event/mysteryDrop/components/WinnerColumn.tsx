import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import Icon from 'app/components/Icon'
import useLocalization from 'app/provider/localization'
import { toThousandSeparator } from 'app/utils'
import { Row, Text, View, styled } from 'dripsy'
import React from 'react'
import { useGetMysteryWinnerQuery } from 'services/eventApi'
import { SolitoImage } from 'solito/image'

const WinnerColumn = () => {
  const { t } = useLocalization()

  return (
    <View
      sx={{
        bg: 'rgba(50, 50, 90, 0.5)',
        borderRadius: 16,
        p: '$3',
        mb: '$4',
      }}
    >
      <View sx={{ alignItems: 'center', mb: '$3' }}>
        <Icon name="mystery-win" size={40} sx={{ mb: '$2' }} />
        <Text sx={{ fontWeight: 'bold', my: '$2' }}>
          {t('event.mystery.latestWins')}
        </Text>
      </View>

      <WinnerColumnContent />
    </View>
  )
}

export const DesktopWinnerColumn = () => {
  const { t } = useLocalization()

  return (
    <View
      sx={{
        bg: 'rgba(50, 50, 90, 0.5)',
        borderRadius: 16,
        p: '$3',
        height: '100%',
      }}
    >
      <View sx={{ alignItems: 'center', mb: '$3' }}>
        <Icon name="mystery-win" size={60} sx={{ mt: -50, mb: '$2' }} />
        <Text sx={{ fontWeight: 'bold' }}>{t('event.mystery.latestWins')}</Text>
      </View>

      <WinnerColumnContent />
    </View>
  )
}

const WinnerColumnContent = () => {
  const { data } = useGetMysteryWinnerQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })
  return (
    <View>
      {data &&
        data?.length > 0 &&
        data.map((item, index) => (
          <Row
            key={index}
            sx={{
              p: '$2',
              borderRadius: 8,
              justifyContent: 'space-between',
              bg: index % 2 === 0 ? '$primary.500' : 'transparent',
            }}
          >
            <Row>
              <SolitoImage
                src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/ic-thropy.png`}
                width={24}
                height={24}
                alt=""
                style={{ marginHorizontal: 16 }}
              />
              <WinnerText>{item.username}</WinnerText>
            </Row>
            <WinnerText>{`VND ${toThousandSeparator(item.amt)}`}</WinnerText>
          </Row>
        ))}
      {data &&
        data?.length > 0 &&
        data.map(
          (item, index) =>
            index < 2 && (
              <Row
                key={index}
                sx={{
                  p: '$2',
                  borderRadius: 8,
                  justifyContent: 'space-between',
                  bg: index % 2 === 0 ? '$primary.500' : 'transparent',
                }}
              >
                <Row>
                  <SolitoImage
                    src={`${MEDIA_DOMAIN}${CONTENT_URI}/rewards/mystery-drop/ic-thropy.png`}
                    width={24}
                    height={24}
                    alt=""
                    style={{ marginHorizontal: 16 }}
                  />
                  <Text sx={{ fontSize: 14 }}>{item.username}</Text>
                </Row>
                <Text sx={{ fontSize: 14 }}>{`VND ${toThousandSeparator(
                  item.amt
                )}`}</Text>
              </Row>
            )
        )}
    </View>
  )
}

const WinnerText = styled(Text)({
  fontSize: 14,
})

export default WinnerColumn
