import { store } from 'app/provider/redux/store'
import { GameLauncherActions } from 'app/store/gameLauncher.slice'
import { GameConfig } from 'services/contentApi.type'

export enum ActionType {
  GAME = 'game',
  REDIRECT = 'redirect',
}

export interface ActionLaunchGame {
  type: ActionType.GAME
  payload: GameConfig
}

export interface ActionRedirect {
  type: ActionType.REDIRECT
  payload: GameConfig
}

export type Action = ActionLaunchGame | ActionRedirect

export function getAction(action: Action): () => void {
  switch (action.type) {
    case ActionType.GAME: {
      return () => {
        store.dispatch(
          GameLauncherActions.launchGame({
            gameCode: action.payload.game_code,
            gameName: action.payload.game_name,
            providerCode: action.payload.game_provider_code,
            image: action.payload.image,
          })
        )
      }
    }
    default:
      return () => {}
  }
}
