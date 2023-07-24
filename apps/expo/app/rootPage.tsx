import React from 'react'
import useOnAppStart from 'app/hooks/useOnAppStart'
import useAppState from 'app/hooks/appState/useAppState'
import useOnAgentAppStart from 'agent/hooks/useOnAgentAppStart'

export default function RootPage() {
  useAppState()
  useOnAppStart()
  useOnAgentAppStart()
  return null
}
