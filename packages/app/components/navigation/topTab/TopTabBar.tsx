import { DripsyGradient } from 'app/components/Gradient'
import { Container, Row, styled } from 'dripsy'
import React, { ReactNode } from 'react'

type Props = { children: ReactNode }

export default function TopTabBar({ children }: Props) {
  return (
    <DripsyGradient gradient="surface">
      <Container
        sx={{
          px: [8, 16, 24],
        }}
      >
        <Content>{children}</Content>
      </Container>
    </DripsyGradient>
  )
}

const Content = styled(Row)({
  gap: ['$2', '$3'],
  alignItems: 'center',
})
