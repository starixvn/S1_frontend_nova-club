import { View } from 'dripsy'
import React, { ComponentType, FC } from 'react'
import { RWebShare } from 'react-web-share'

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
): FC<T & WithShareProps> {
  const WithShareComponent = ({ options, ...rest }: T & WithShareProps) => {
    /* Native Share on web only works on https */
    return (
      <RWebShare
        data={{
          text: options?.message,
          url: options?.url,
          title: options?.title,
        }}
        onClick={() => console.log('shared successfully!')}
      >
        <div>
          <View pointerEvents="none">
            <WrappedComponent {...(rest as T)} disabled />
          </View>
        </div>
      </RWebShare>
    )
  }

  return WithShareComponent
}

export default withShare
