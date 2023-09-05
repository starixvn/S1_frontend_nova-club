import React, { ComponentProps, ReactNode } from 'react'
import PageContainerIconlabel, {
  PageContainerIconlabelProps,
} from './PageContainerIconLabel'
import { SxProp, View } from 'dripsy'
import PageContainer from './PageContainer'

export default function PageSection({
  children,
  icon,
  text,
  ...rest
}: PageContainerIconlabelProps & ComponentProps<typeof View>) {
  return (
    <View {...rest}>
      <PageContainerIconlabel icon={icon} text={text} />
      <PageContainer>{children}</PageContainer>
    </View>
  )
}
