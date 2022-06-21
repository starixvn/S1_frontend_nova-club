import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authApi from 'app/services/authApi'
import bankApi from 'app/services/bank'
import changePasswordApi from 'app/services/changePassword'
import contentApi from 'app/services/contentApi'
import depositApi from 'app/services/deposit'
import dummyDepositApi from 'app/services/dummyDeposit'
import gameApi from 'app/services/gameApi'
import playerApi from 'app/services/playerApi'
import pokemonApi from 'app/services/pokemon'
import walletApi from 'app/services/wallet'
import withdrawalApi from 'app/services/withdrawal'
import { alertReducer } from 'app/store/alert'
import bankReducer from 'app/store/bankReducer'
import playerReducer, {
  PlayerState,
  playerInitialState,
} from 'app/store/playerReducer'
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
  whitelist: ['player'],
  migrate: createMigrate(migrations, { debug: true }),
  transforms: [
    createTransform<PlayerState, Pick<PlayerState, 'currentLoginInfo'>>(
      // transform state on its way to being serialized and persisted.
      (inboundState, key) => {
        const { currentLoginInfo } = inboundState
        return { currentLoginInfo }
      },
      // transform state being rehydrated
      (outboundState, key) => {
        return { ...playerInitialState, ...outboundState }
      },
      { whitelist: ['player'] }
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
  pokemonApi.middleware,
  walletApi.middleware,
  withdrawalApi.middleware,
  dummyDepositApi.middleware,
]

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [bankApi.reducerPath]: bankApi.reducer,
  [changePasswordApi.reducerPath]: changePasswordApi.reducer,
  [contentApi.reducerPath]: contentApi.reducer,
  [depositApi.reducerPath]: depositApi.reducer,
  [gameApi.reducerPath]: gameApi.reducer,
  [playerApi.reducerPath]: playerApi.reducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  [withdrawalApi.reducerPath]: withdrawalApi.reducer,
  [dummyDepositApi.reducerPath]: dummyDepositApi.reducer,
  alert: alertReducer,
  bank: bankReducer,
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
