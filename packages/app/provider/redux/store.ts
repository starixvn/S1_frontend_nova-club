import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authApi from 'app/services/authApi'
import contentApi from 'app/services/contentApi'
import gameApi from 'app/services/gameApi'
import playerApi from 'app/services/playerApi'
import playerReducer from 'app/store/playerReducer'
import { Platform } from 'react-native'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  PersistedState,
  persistReducer,
  persistStore,
  createMigrate,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const migrations = {
  1: (s: PersistedState) => s,
  2: (s: PersistedState) => s,
}

const persistConfig = {
  key: 'root',
  version: 2,
  storage: Platform.OS === 'web' ? storage : AsyncStorage,
  whitelist: ['player'],
  migrate: createMigrate(migrations, { debug: true }),
}

const middlerwares = [
  authApi.middleware,
  contentApi.middleware,
  gameApi.middleware,
  playerApi.middleware,
]

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [contentApi.reducerPath]: contentApi.reducer,
  [gameApi.reducerPath]: gameApi.reducer,
  [playerApi.reducerPath]: playerApi.reducer,
  player: playerReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middlerwares),
})

export const makeStore = () => store
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
