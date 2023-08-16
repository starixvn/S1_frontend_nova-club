import useOnAgentAppStart from 'agent/hooks/useOnAgentAppStart'
import useAppState from 'app/hooks/appState/useAppState'
import useOnAppStart from 'app/hooks/useOnAppStart'

type Props = {}

export default function SessionHandler({}: Props) {
  useAppState()
  useOnAppStart()
  useOnAgentAppStart()
  return null
}
