import { type ReactNode } from 'react'
import { AppShell } from '@mantine/core'

import { FixedHeader } from './FixedHeader'

import { FlexBox } from '~/components/Base/FlexBox'
import { LoadingContentOverlay } from '~/components/Base/Loading'
import { useLoadingContext } from '~/providers/LoadingProvider'

type Props = {
  children: ReactNode
  isShowFooter?: boolean
}

const headerHeight = 60

export const DefaultLayout = ({ children }: Props): ReactNode => {
  const { isLoading } = useLoadingContext()
  return (
    <AppShell header={{ height: headerHeight }} padding="md">
      <FixedHeader />
      <AppShell.Main
        bg="cyan.0"
        style={{
          height: `calc(100vh - ${headerHeight}px)`,
          overflow: 'scroll',
        }}
      >
        <FlexBox
          justify="flex-start"
          align="flex-start"
          style={{
            position: 'relative',
          }}
        >
          {isLoading && <LoadingContentOverlay />}
          {children}
        </FlexBox>
      </AppShell.Main>
    </AppShell>
  )
}
