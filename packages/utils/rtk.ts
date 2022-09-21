import { useEffect, useReducer, useState } from 'react'
import { sleep } from './common'

const dummyRtkState = {
  isFetching: false,
  isLoading: true,
  isSuccess: false,
  data: null,
}

function dummyRtkReducer(state, action) {
  switch (action.type) {
    case 'firstRequest':
      return { ...state, isLoading: !state.data, isFetching: true }
    case 'subsequentRequest':
      return { ...state, isFetching: true }
    case 'onSuccess':
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        isSuccess: true,
        isLoading: false,
      }
    default:
      throw new Error()
  }
}

type DummyRTKType = typeof dummyRtkState & {
  refetch: () => Promise<any>
}

/// data, isFetching, isLoading, isSuccess, refetch
export function useDummyRtk(dummyData): DummyRTKType {
  const [state, dispatch] = useReducer(dummyRtkReducer, dummyRtkState)

  async function dummyApiRequest(first?: boolean) {
    if (first) dispatch({ type: 'firstRequest' })
    else dispatch({ type: 'subsequentRequest' })
    // await sleep(200)
    dispatch({ type: 'onSuccess', payload: dummyData })
  }

  useEffect(() => {
    dummyApiRequest(true)
  }, [])

  return {
    ...state,
    refetch: dummyApiRequest,
  }
}

export function TestDummyRTK() {
  const { data, isFetching, isLoading, isSuccess, refetch } = useDummyRtk({
    name: 'Tester',
    age: 99,
  })

  useEffect(() => {
    console.log('state', { data, isFetching, isLoading, isSuccess })
  }, [data, isFetching, isLoading, isSuccess])

  useEffect(() => {
    const to = setTimeout(() => {
      console.log('Dummy RTK refetch')
      refetch()
    }, 4000)

    return () => {
      clearTimeout(to)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
