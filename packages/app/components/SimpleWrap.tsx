import { HOME_PADDING } from 'app/constant/sizes'
import useContainerDimension from 'app/hooks/useContainerDimension'
import useGameGridSize from 'app/hooks/useGameGridSize'
import { ContextualModuleKey } from 'app/navigation/web/withContextualNavConstant'
import { styled, View } from 'dripsy'
import SimpleGridImage from './SimpleGridImage'

const SimpleWrap = ({ data, col = 3, context }) => {
  const { containerSpace, itemSpace, contentWidth } = useGameGridSize(col)
  return (
    <StyledWrapItem sx={{ p: containerSpace }}>
      {data.map((item, rindex) => {
        return (
          <SimpleGridImage
            sx={{ m: itemSpace }}
            context={context}
            key={item.gameName}
            gameName={item.gameName}
            providerCode={item.providerCode}
            gameCode={item.gameCode}
            image={item.image}
            title={item.vi ?? item.gameName}
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
