import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useGameGridSize from 'app/hooks/useGameGridSize'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { styled, View } from 'dripsy'
import SimpleGridImage from './SimpleGridImage'

const SimpleWrap = ({ data }) => {
  const { containerSpace, itemSpace, contentWidth } = useGameGridSize()
  return (
    <StyledWrapItem sx={{ p: containerSpace }}>
      {data.map((item, rindex) => {
        return (
          <SimpleGridImage
            sx={{ m: itemSpace }}
            context={ContextualModuleKey.Sportsbook}
            key={item.gameName}
            gameName={item.gameName}
            providerCode={item.providerCode}
            gameCode={item.gameCode}
            image={require('../assets/images/games/AG01.png')}
            title={item.gameName}
            width={contentWidth}
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
