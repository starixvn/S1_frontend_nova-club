import React, {
  Context,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

interface GameState {
  isAssetLoaded: boolean
  setAssetLoaded: Dispatch<SetStateAction<boolean>>
  totalWon: number
  setTotalWon: Dispatch<SetStateAction<number>>
}

const GameContext = createContext<GameState>({
  isAssetLoaded: false,
  setAssetLoaded: (b) => {},
  totalWon: 0,
  setTotalWon: (b) => {},
})

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [isAssetLoaded, setAssetLoaded] = useState(false)
  const [totalWon, setTotalWon] = useState(0)

  const state = useMemo(() => {
    return {
      isAssetLoaded,
      setAssetLoaded,
      totalWon,
      setTotalWon,
    }
  }, [isAssetLoaded, totalWon])

  return <GameContext.Provider value={state}>{children}</GameContext.Provider>
}

export function useGameState() {
  return useContext(GameContext)
}

export const ContextBridge = ({
  children,
  Context,
  render,
}: {
  children: ReactNode
  Context: Context<any>
  render: (n: ReactNode) => ReactNode
}) => {
  return (
    <Context.Consumer>
      {(value) =>
        render(<Context.Provider value={value}>{children}</Context.Provider>)
      }
    </Context.Consumer>
  )
}

export default GameContext
