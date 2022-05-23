import authApi from 'app/services/authApi'
import contentApi from 'app/services/contentApi'
import { configureStore } from '@reduxjs/toolkit'

const middlerwares = [authApi.middleware, contentApi.middleware]

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlerwares),
})

export const makeStore = () => store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
