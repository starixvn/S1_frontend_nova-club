import useFocusedSelector from 'app/hooks/useFocusedSelector'
import useLocalization from 'app/provider/localization'
import { useAppSelector } from 'app/provider/redux/store'
import { useCallback, useMemo } from 'react'
import { useGameCategoryTagTypesQuery } from 'services/gameApi'
import { GameCategoryTagTypes } from 'services/gameApi.type'
import { GAME_TYPE_CODE } from 'utils/constant'

export type GameCategoryTagTranslation = Record<
  string,
  GameCategoryTagTypes['category_name']
>

type UseQueryOption = Parameters<typeof useGameCategoryTagTypesQuery>[1]

const useGameCategoryTag = (
  gameTypes: GAME_TYPE_CODE[],
  options?: UseQueryOption
) => {
  const currency = useFocusedSelector((s) => s.setting.currency)
  const { data: gameCategoryTagTypes, isError } = useGameCategoryTagTypesQuery(
    currency,
    options as any // Without `any` type casting, the `data` will become `any` type
  )

  const gameCategoryTagTranslation = useMemo(() => {
    if (isError || !gameCategoryTagTypes) {
      return
    }

    const tagTranslation = data.filter((tag) =>
      gameTypes.includes(tag.gtc as GAME_TYPE_CODE)
    )

    const result: GameCategoryTagTranslation = tagTranslation.reduce(
      (acc, item) => {
        acc[item.ck] = item.category_name
        return acc
      },
      {} as GameCategoryTagTranslation
    )

    return result
  }, [gameCategoryTagTypes, gameTypes, isError])

  return gameCategoryTagTranslation
}

export default useGameCategoryTag

export const useGetTagName = () => {
  const locale = useFocusedSelector((s) => s.setting.locale)
  const { t } = useLocalization()

  const getTagName = useCallback(
    (tag: string, gameCategoryTagTranslation?: GameCategoryTagTranslation) => {
      const translatedTagConfig = gameCategoryTagTranslation?.[tag]

      if (!translatedTagConfig) {
        return t(tag)
      }

      return translatedTagConfig[locale]
    },
    [locale, t]
  )

  return {
    getTagName,
  }
}
