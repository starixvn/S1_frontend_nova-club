import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit'
import { alertReducer } from 'app/store/alert.slice'
import authReducer, { authInitialState, AuthState } from 'app/store/authReducer'
import bankReducer from 'app/store/bankReducer'
import { depositReducer } from 'app/store/deposit.slice'
import { gameLauncherReducer } from 'app/store/gameLauncher.slice'
import { Setting, settingReducer } from 'app/store/setting.slice'
import { tempSettingReducer } from 'app/store/tempSetting.slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  createMigrate,
  createTransform,
  PersistConfig,
  PersistedState,
  persistReducer,
  persistStore,
} from 'redux-persist'
import { baseApi } from 'services/baseApi'
import { storage } from './persistStorage/index'

const migrations = {
  5: (s: PersistedState) => {},
  6: (s: PersistedState) => {},
}

const persistConfig: PersistConfig<any> = {
  key: 'root',
  version: 6,
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
      { whitelist: ['auth'] }
    ),
    // createTransform<Setting, Setting>(
    //   (inboundState, key) => {
    //     return inboundState
    //   },
    //   (outboundState, key) => {
    //     const clearShieldId = {
    //       ...outboundState,
    //       shieldSessionID: undefined,
    //     }

    //     return clearShieldId
    //   },
    //   { whitelist: ['setting'] }
    // ),
  ],
}

const middlerwares = [baseApi.middleware]

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  alert: alertReducer,
  auth: authReducer,
  bank: bankReducer,
  deposit: depositReducer,
  setting: settingReducer,
  tempSetting: tempSettingReducer,
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
