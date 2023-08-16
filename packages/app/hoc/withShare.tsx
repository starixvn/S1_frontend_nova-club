import React, { ComponentType, FC } from 'react'
import Share from 'react-native-share'

interface WithShareProps {
  options?: {
    message: string
    url: string
    title: string
  }
}

function withShare<T>(
  // Then we need to type the incoming component.
  // This creates a union type of whatever the component
  // already accepts AND our extraInfo prop
  WrappedComponent: ComponentType<T>
): FC<Omit<T & WithShareProps, 'onPress'>> {
  const WithShareComponent = ({ options, ...rest }: T & WithShareProps) => {
    async function onShare() {
      if (options) {
        try {
          const result = await Share.open(options).catch(
            (err) => err && console.log('err', err)
          )
        } catch (error) {
          alert(error.message)
        }
      }
    }

    return <WrappedComponent {...(rest as T)} onPress={onShare} />
  }

  return WithShareComponent
}

export default withShare
