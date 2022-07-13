import { CONTENT_URI, MEDIA_DOMAIN } from '@env'
import { ProviderImageExtension } from 'app/config/games/extension'
import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useGameGridSize from 'app/hooks/useGameGridSize'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import useLocalization from 'app/provider/localization'
import { styled, View } from 'dripsy'
import SimpleGridImage from './SimpleGridImage'

const SimpleWrap = ({ data, col = 3, context }) => {
  const { containerSpace, itemSpace, contentWidth } = useGameGridSize(col)
  const { t } = useLocalization()
  return (
    <StyledWrapItem sx={{ p: containerSpace }}>
      {data.map((item, rindex) => {
        const { game_code, game_provider_code, game_name, image, desktop } =
          item
        const imageUrl =
          image ??
          `${MEDIA_DOMAIN}${CONTENT_URI}/games/${game_provider_code.toLowerCase()}/${game_code.toLowerCase()}.${
            ProviderImageExtension[game_provider_code.toLowerCase()] ?? 'jpg'
          }`

        return (
          <SimpleGridImage
            sx={{ m: itemSpace }}
            context={context}
            key={game_name}
            gameName={game_name}
            providerCode={game_provider_code}
            gameCode={game_code}
            image={imageUrl}
            title={t(game_name) + ` (${game_code})`}
            width={contentWidth}
            desktop={desktop}
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
