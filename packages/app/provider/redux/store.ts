import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authApi from 'app/services/authApi'
import changePasswordApi from 'app/services/changePassword'
import contentApi from 'app/services/contentApi'
import gameApi from 'app/services/gameApi'
import playerApi from 'app/services/playerApi'
import playerWithdrawalBankApi from 'app/services/playerWithdrawalBank'
import withdrawalBankApi from 'app/services/withdrawalBank'
import { alertReducer } from 'app/store/alert'
import playerReducer from 'app/store/playerReducer'
import { settingReducer } from 'app/store/setting.slice'
import { Platform } from 'react-native'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  PersistedState,
  persistReducer,
  persistStore,
  createMigrate,
} from 'redux-persist'
import { storage } from './persistStorage/index'

const migrations = {
  1: (s: PersistedState) => s,
  2: (s: PersistedState) => s,
}

const persistConfig = {
  key: 'root',
  version: 2,
  storage,
  whitelist: ['player'],
  migrate: createMigrate(migrations, { debug: true }),
}

const middlerwares = [
  authApi.middleware,
  contentApi.middleware,
  gameApi.middleware,
  playerApi.middleware,
  changePasswordApi.middleware,
  withdrawalBankApi.middleware,
  playerWithdrawalBankApi.middleware,
]

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [contentApi.reducerPath]: contentApi.reducer,
  [gameApi.reducerPath]: gameApi.reducer,
  [playerApi.reducerPath]: playerApi.reducer,
  [changePasswordApi.reducerPath]: changePasswordApi.reducer,
  [withdrawalBankApi.reducerPath]: withdrawalBankApi.reducer,
  [playerWithdrawalBankApi.reducerPath]: playerWithdrawalBankApi.reducer,
  alert: alertReducer,
  player: playerReducer,
  setting: settingReducer,
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
