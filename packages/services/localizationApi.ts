import {
  LOCALIZATION_DOMAIN,
  LOCALIZATION_KEY,
  LOCALIZATION_PROJECT_ID,
} from '@env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { TreeTranslationsData } from '@tolgee/react'
import { LANGUAGE_CODE, LANGUAGE_NAMESPACE } from 'utils/constant'

export const localizationApi = createApi({
  reducerPath: 'localizationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${LOCALIZATION_DOMAIN}/v2/projects/${LOCALIZATION_PROJECT_ID}`,
    headers: {
      'X-Api-Key': LOCALIZATION_KEY,
    },
  }),
  endpoints: (builder) => ({
    translations: builder.query<
      TreeTranslationsData,
      { locale: LANGUAGE_CODE; namespace: LANGUAGE_NAMESPACE }
    >({
      // Will make a request like https://pokeapi.co/api/v2/pokemon/bulbasaur
      query: ({ locale, namespace }) => ({
        url: `/translations/${locale}`,
        params: {
          ns: namespace,
        },
      }),
    }),
  }),
})
