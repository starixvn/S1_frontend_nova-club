import useContextualRouter from 'app/navigation/contextual/useContextualRouter'
import React, { useEffect } from 'react'

export default function HandlePaymentUnfound() {
  const { back } = useContextualRouter()
  useEffect(() => {
    // Perform direct back navigation when the component mounts
    back()
  }, [])

  return <></>
}
