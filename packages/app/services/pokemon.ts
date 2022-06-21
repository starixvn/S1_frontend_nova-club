import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { EndpointBuilderType, IResponse } from './common/types'
import { PokemonArgs, PokemonResult } from './pokemon.type'

const pokemonEndPoints = (builder: EndpointBuilderType) => {
  return {
    pokemon: builder.query<PokemonResult[], PokemonArgs>({
      query: ({ offset, limit = 10 }) => ({
        url: `pokemon?limit=${limit}&offset=${offset}`,
      }),
    }),
  }
}

const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2' }),
  endpoints: (builder) => ({
    ...pokemonEndPoints(builder),
  }),
})

export default pokemonApi
export { pokemonEndPoints }
export const { useLazyPokemonQuery } = pokemonApi
