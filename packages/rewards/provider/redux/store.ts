import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit'
import { authApi } from 'services/authApi'
import { rewardApi } from 'services/rewardApi'
import authReducer from './reducers/authReducer'
// import { alertReducer } from 'app/store/alert.slice'
// import bankReducer from 'app/store/bankReducer'
// import { depositReducer } from 'app/store/deposit.slice'
// import { gameLauncherReducer } from 'app/store/gameLauncher.slice'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist'

import { persistMigrate, persistVersion, persistWhitelist } from './persist'
import { storage } from './persistStorage/index'
import { baseApi } from 'services/baseApi'
import { settingReducer } from './reducers/settingReducer'

const persistConfig: PersistConfig<any> = {
  key: 'root',
  version: persistVersion,
  storage,
  whitelist: persistWhitelist as unknown as string[],
  migrate: persistMigrate,
  // transforms: [
  //   createTransform<AuthState, Omit<AuthState, "isLogoutActionTriggered">>(
  //     // transform state on its way to being serialized and persisted.
  //     (inboundState, key) => {
  //       const { isLogoutActionTriggered, ...restInboundState } = inboundState;
  //       return restInboundState;
  //     },
  //     // transform state being rehydrated
  //     (outboundState, key) => {
  //       return { ...authInitialState, ...outboundState };
  //     },
  //     { whitelist: ["auth", "agent"] }
  //   ),
  //   createTransform<Setting, Setting>(
  //     (inboundState, key) => {
  //       return inboundState;
  //     },
  //     (outboundState, key) => {
  //       const clearShieldId = {
  //         ...outboundState,
  //         shieldSessionID: undefined,
  //       };

  //       return clearShieldId;
  //     },
  //     { whitelist: ["setting"] }
  //   ),
  // ],
}

const middlerwares = [
  baseApi.middleware,
  rewardApi.middleware,
  authApi.middleware,
]

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [rewardApi.reducerPath]: rewardApi.reducer,
  auth: authReducer,
  setting: settingReducer,
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
