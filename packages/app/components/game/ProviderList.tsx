import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import useLocalization from 'app/provider/localization'
import { ProviderImageCategory } from 'utils/constant'
import { ActivityIndicator, Pressable, Row, View } from 'dripsy'
import React from 'react'
import { SolitoImage } from 'solito/image'
import SectionHeader from '../SectionHeader'
import { GameProviderCategory } from './GameUtilityAction'

// const cols = [3, 3, 4]
const width = ['32%', '24%', '19.5%', '19.5%', '16%']
const spaces = ['0.66%', '0.25%', '0.25%', '0.33%']

export default function ProviderList({
  data,
  imageCategory,
  onNavigateProvider,
}: {
  data?: GameProviderCategory[]
  imageCategory: ProviderImageCategory
  onNavigateProvider: (index: number, gpc: string) => void
}) {
  const { t } = useLocalization()
  return (
    <View>
      <SectionHeader icon="all" title={t('common.provider')} />
      {!data || data.length === 0 ? (
        <ActivityIndicator color="$primary.300" sx={{ my: '$4' }} />
      ) : (
        <View sx={{ px: ['$1', '$2'], pt: ['$2', '$3'] }}>
          <Row
            sx={{
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            {data.map((g, i) => {
              return (
                <Pressable
                  key={i}
                  onPress={() => onNavigateProvider(i, g.gpc)}
                  sx={{
                    width: width,
                    m: spaces,
                    // maxWidth: 240,
                    aspectRatio: 240 / 80,
                    overflow: 'hidden',
                    // alignSelf: 'stretch',
                  }}
                >
                  <SolitoImage
                    fill
                    src={`${MEDIA_DOMAIN}${CONTENT_URI}/v2/gameV2/provider/colored/${imageCategory}/${g.gpc?.toLowerCase()}.png`}
                    alt={g.gpc}
                  />
                </Pressable>
              )
            })}
          </Row>
        </View>
      )}
    </View>
  )
}
