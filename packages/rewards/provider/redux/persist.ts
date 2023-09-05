import { createMigrate } from 'redux-persist'

import { RootState } from './store'

/* 
    Shortcut migration , since we are always resetting the whole state each time migration happens
    https://gist.github.com/lafiosca/b7bbb569ae3fe5c1ce110bf71d7ee153?permalink_comment_id=3983141#gistcomment-3983141 
*/

export const persistVersion = 7
export const persistWhitelist = ['auth'] as const

type Whitelist = typeof persistWhitelist
type Whitelisted = Whitelist extends ReadonlyArray<infer T> ? T : never
type PersistedRootState = Pick<RootState, Whitelisted>

const persistMigrations = {
  [persistVersion]: (): PersistedRootState => {
    return {
      auth: undefined,
    }
  },
}

export const persistMigrate = createMigrate<PersistedRootState>(persistMigrations)
