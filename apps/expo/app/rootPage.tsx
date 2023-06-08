import React from 'react'
import useOnAppStart from 'app/hooks/useOnAppStart'
import useAppState from 'app/hooks/appState/useAppState'

export default function RootPage() {
  useAppState()
  useOnAppStart()
  return null
}
