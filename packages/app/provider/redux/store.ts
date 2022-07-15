import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit'
import { alertReducer } from 'app/store/alert'
import authReducer, { authInitialState, AuthState } from 'app/store/authReducer'
import bankReducer from 'app/store/bankReducer'
import { gameLauncherReducer } from 'app/store/gameLauncher.slice'
import authApi from 'services/authApi'
import bankApi from 'services/bank'
import changePasswordApi from 'services/changePassword'
import contentApi from 'services/contentApi'
import depositApi from 'services/deposit'
import dummyDepositApi from 'services/dummyDeposit'
import gameApi from 'services/gameApi'
import messageApi from 'services/messageApi'
import playerApi from 'services/playerApi'
import walletApi from 'services/walletApi'
import withdrawalApi from 'services/withdrawal'
import { depositReducer } from 'app/store/deposit.slice'
import { settingReducer } from 'app/store/setting.slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  createMigrate,
  createTransform,
  PersistConfig,
  PersistedState,
  persistReducer,
  persistStore,
} from 'redux-persist'
import { storage } from './persistStorage/index'

const migrations = {
  1: (s: PersistedState) => s,
  2: (s: PersistedState) => s,
}

const persistConfig: PersistConfig<any> = {
  key: 'root',
  version: 2,
  storage,
  whitelist: ['auth', 'setting'],
  migrate: createMigrate(migrations, { debug: true }),
  transforms: [
    createTransform<AuthState, Omit<AuthState, 'isLogoutActionTriggered'>>(
      // transform state on its way to being serialized and persisted.
      (inboundState, key) => {
        const { isLogoutActionTriggered, ...restInboundState } = inboundState
        return restInboundState
      },
      // transform state being rehydrated
      (outboundState, key) => {
        return { ...authInitialState, ...outboundState }
      },
      { whitelist: ['auth', 'setting'] }
    ),
  ],
}

const middlerwares = [
  authApi.middleware,
  bankApi.middleware,
  changePasswordApi.middleware,
  contentApi.middleware,
  depositApi.middleware,
  gameApi.middleware,
  playerApi.middleware,
  walletApi.middleware,
  withdrawalApi.middleware,
  dummyDepositApi.middleware,
  messageApi.middleware,
]

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [bankApi.reducerPath]: bankApi.reducer,
  [changePasswordApi.reducerPath]: changePasswordApi.reducer,
  [contentApi.reducerPath]: contentApi.reducer,
  [depositApi.reducerPath]: depositApi.reducer,
  [gameApi.reducerPath]: gameApi.reducer,
  [playerApi.reducerPath]: playerApi.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  [withdrawalApi.reducerPath]: withdrawalApi.reducer,
  [dummyDepositApi.reducerPath]: dummyDepositApi.reducer,
  [messageApi.reducerPath]: messageApi.reducer,
  alert: alertReducer,
  auth: authReducer,
  bank: bankReducer,
  deposit: depositReducer,
  setting: settingReducer,
  gameLauncher: gameLauncherReducer,
})

/** Fix typescript issue https://github.com/rt2zz/redux-persist/issues/1184 */
type InferState<Type> = Type extends Reducer<infer S> ? S : never
const persistedReducer = persistReducer<InferState<typeof rootReducer>>(
  persistConfig,
  rootReducer
)

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
