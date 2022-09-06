import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { ProviderImageExtension } from 'app/config/games/extension'
import useGameGridSize from 'app/hooks/useGameGridSize'
import useLocalization from 'app/provider/localization'
import { styled, View } from 'dripsy'
import SimpleGridImage from './SimpleGridImage'

/* Deprecateed */
/* use SimpleGridImage instead */
const SimpleWrap = ({ data, col = 3 }) => {
  const { containerSpace, itemSpace, contentWidth } = useGameGridSize(col)
  const { t } = useLocalization()
  return (
    <StyledWrapItem sx={{ p: containerSpace }}>
      {data.map((item, rindex) => {
        const {
          game_code,
          game_provider_code,
          game_name,
          image,
          desktop,
          game_type_code,
        } = item
        const imageUrl =
          image ??
          `${MEDIA_DOMAIN}${CONTENT_URI}/games/${game_provider_code.toLowerCase()}/${game_code.toLowerCase()}.${
            ProviderImageExtension[game_provider_code.toLowerCase()] ?? 'jpg'
          }`

        // const formattedName = name
        //   ? typeof name === 'string'
        //     ? name
        //     : name[locale]
        //   : undefined

        return (
          <SimpleGridImage
            sx={{ m: itemSpace }}
            key={game_name}
            providerCode={game_provider_code}
            gameCode={game_code}
            image={imageUrl}
            title={t(game_name)}
            width={contentWidth}
            desktop={desktop}
            gameType={game_type_code}
          />
        )
      })}
    </StyledWrapItem>
  )
}
const StyledWrapItem = styled(View)({
  flexDirection: 'row',
  flexWrap: 'wrap',
})

export default SimpleWrap
