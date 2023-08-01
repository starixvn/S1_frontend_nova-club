import { LaunchGamePayload } from 'app/store/gameLauncher.slice'
import { Game } from 'services/gameApi.type'

export function GameToLaunchPayload(
  g: Game,
  locale: string
): LaunchGamePayload {
  return {
    gameCode: g.gc,
    gameName: g.name[locale],
    gameType: g.gtc,
    image: g.img,
    providerCode: g.gpc,
  }
}
