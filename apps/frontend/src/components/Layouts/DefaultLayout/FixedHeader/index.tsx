import { AppShell } from '@mantine/core'
import Link from 'next/link'

import styles from './style.module.css'

import { FlexBox } from '~/components/Base/FlexBox'

export const FixedHeader = (): React.ReactNode => {
  return (
    <AppShell.Header px={16}>
      <FlexBox direction="row" justify="space-between">
        <FlexBox justify="flex-start" direction="row" gap={8}>
          <Link href="/" className={styles.title}>
            <h1>Voteboard</h1>
          </Link>
        </FlexBox>
      </FlexBox>
    </AppShell.Header>
  )
}
