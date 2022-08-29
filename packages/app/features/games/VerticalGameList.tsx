import { CMS_CONTENT_URI, MEDIA_DOMAIN } from '@env'
import SimpleGridImage from 'app/components/SimpleGridImage'
import useGameGridSize from 'app/hooks/useGameGridSize'
import { useAppSelector } from 'app/provider/redux/store'
import { GAME_TAGS } from 'app/utils/constant'
import { styled, useSx, View } from 'dripsy'
import React, { forwardRef, useMemo } from 'react'

import { Game } from 'services/contentApi.type'

import { FlashList, FlashListProps } from '@shopify/flash-list'
import IconButton from 'app/components/form/IconButton'
import Icon from 'app/components/Icon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native'

type VerticalGameListProps = Omit<FlashListProps<Game>, 'renderItem'> & {
  isLoading?: boolean
  showName?: boolean
  showScrollingTop?: boolean
}

const VerticalGameList = forwardRef<FlashList<Game>, VerticalGameListProps>(
  ({ numColumns = 3, showName, showScrollingTop, ...rest }, ref) => {
    const { containerSpace, itemSpace, contentWidth } =
      useGameGridSize(numColumns)
    const locale = useAppSelector((s) => s.setting.locale)
    const memoSpace = useMemo(() => {
      return {
        m: itemSpace,
      }
    }, [itemSpace])

    const renderItem = ({ item }) => {
      const { gc, gpc, img, tags, name, gtc } = item
      const imageUrl = `${MEDIA_DOMAIN}${CMS_CONTENT_URI}/${img}`
      const isNewGame = tags.includes(GAME_TAGS.NEW)
      const isHotGame = tags.includes(GAME_TAGS.HOT)
      const isDesktop = tags.includes(GAME_TAGS.DESKTOP)
      const gameName = name[locale]
      return (
        <SimpleGridImage
          showName={showName}
          sx={memoSpace}
          providerCode={gpc}
          gameCode={gc}
          image={imageUrl}
          width={contentWidth}
          isNewGame={isNewGame}
          isHotGame={isHotGame}
          gameName={gameName}
          gameType={gtc}
          desktopMode={isDesktop}
        />
      )
    }

    return (
      <View sx={{ bg: '$background', flex: 1, position: 'relative' }}>
        <FlashList<Game>
          ref={ref}
          keyExtractor={(item) => {
            const { gc, gpc, gtc, img } = item
            return `${gc?.trim() + gpc + gtc + img}`
          }}
          renderItem={renderItem}
          estimatedItemSize={50}
          numColumns={numColumns}
          contentContainerStyle={{
            paddingTop: 8,
            paddingBottom: 16,
          }}
          {...rest}
        />
        {showScrollingTop && (
          <ScrollTopButton>
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
      </View>
    )
  }
)

VerticalGameList.displayName = 'VerticalGameList'

export default VerticalGameList

const ScrollTopButton = styled(View)(() => ({
  position: 'absolute',
  right: 0,
  width: '20%',
  alignItems: 'center',
  bottom: 30,
  zIndex: 1,
}))
