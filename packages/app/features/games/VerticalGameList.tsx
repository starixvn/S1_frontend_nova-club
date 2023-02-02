import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import SimpleGridImage from 'app/components/SimpleGridImage'
import useGameGridSize from 'app/hooks/useGameGridSize'
import { useAppSelector } from 'app/provider/redux/store'
import { GAME_TAGS } from 'app/utils/constant'
import { styled, View } from 'dripsy'
import React, { forwardRef, useMemo, useState } from 'react'

import { Game } from 'services/contentApi.type'

import { FlashList, FlashListProps } from '@shopify/flash-list'
import IconButton from 'app/components/form/IconButton'
import useOrientation from 'app/hooks/useOrientation'
import { AnimatePresence, MotiView } from 'moti'
import useSeamlessList from './useSeamlessList'

type VerticalGameListProps = Omit<FlashListProps<Game>, 'renderItem'> & {
  isLoading?: boolean
  showName?: boolean
  showPlaynow?: boolean
  showScrollingTop?: boolean
  showSkeleton?: boolean
}

const VerticalGameList = forwardRef<FlashList<Game>, VerticalGameListProps>(
  (
    {
      numColumns = 3,
      showName,
      showPlaynow,
      showScrollingTop,
      showSkeleton,
      ...rest
    },
    ref
  ) => {
    const [isScrolled, setScrolled] = useState(false)

    const { isLandscape } = useOrientation()

    const modifiedCols = numColumns + (isLandscape ? 1 : 0)
    const { containerSpace, itemSpace, contentWidth } =
      useGameGridSize(modifiedCols)
    const locale = useAppSelector((s) => s.setting.locale)
    const memoSpace = useMemo(() => {
      return {
        m: itemSpace,
      }
    }, [itemSpace])
    const { seamlessProviderList } = useSeamlessList()

    const renderItem = ({ item }) => {
      const { gc, gpc, img, tags, name, gtc } = item
      const imageUrl = `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${img}`
      const isNewGame = tags.includes(GAME_TAGS.NEW)
      const isHotGame = tags.includes(GAME_TAGS.HOT)
      const isDesktop = tags.includes(GAME_TAGS.DESKTOP)
      const formattedName = name
        ? typeof name === 'string'
          ? name
          : name[locale]
        : undefined
      return (
        <SimpleGridImage
          showPlaynow={showPlaynow}
          showName={showName}
          skeleton={showSkeleton}
          sx={memoSpace}
          providerCode={gpc}
          gameCode={gc}
          image={imageUrl}
          width={contentWidth}
          isNewGame={isNewGame}
          isHotGame={isHotGame}
          gameName={formattedName}
          gameType={gtc}
          desktopMode={isDesktop}
          isSeamless={seamlessProviderList.includes(gpc)}
        />
      )
    }

    return (
      <View sx={{ bg: '$background', flex: 1, position: 'relative' }}>
        <FlashList<Game>
          key={modifiedCols}
          ref={ref}
          onScroll={({ nativeEvent }) => {
            if (isScrolled && nativeEvent?.contentOffset?.y === 0)
              setScrolled(false)
            else if (!isScrolled && nativeEvent?.contentOffset?.y > 0)
              setScrolled(true)
          }}
          keyExtractor={(item) => {
            const { gc, gpc, gtc, img } = item
            return `${gc?.trim() + gpc + gtc + img}`
          }}
          renderItem={renderItem}
          estimatedItemSize={50}
          numColumns={modifiedCols}
          contentContainerStyle={{
            paddingTop: 8,
            paddingBottom: 16,
          }}
          {...rest}
        />
        <AnimatePresence>
          {showScrollingTop && isScrolled && (
            <ScrollTopButton
              exit={{ scale: 0 }}
              animate={{ scale: 1 }}
              from={{ scale: 0 }}
            >
              <IconButton
                size={20}
                sx={{
                  backgroundColor: 'rgb(51, 160, 208)',
                  p: '$2a',
                }}
                onPress={() => {
                  ref?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  })
                }}
                name="arrow-up"
              />
            </ScrollTopButton>
          )}
        </AnimatePresence>
      </View>
    )
  }
)

VerticalGameList.displayName = 'VerticalGameList'

export default VerticalGameList

const ScrollTopButton = styled(MotiView)(() => ({
  position: 'absolute',
  alignSelf: 'center',
  alignItems: 'center',
  bottom: 30,
  zIndex: 1,
  borderRadius: 50,
  overflow: 'hidden',
}))
