import { AppShell } from '@mantine/core'
import Link from 'next/link'

import styles from './style.module.css'

import { FlexBox } from '~/components/Base/FlexBox'
import { useAuthContext } from '~/providers/AuthProvider'

export const FixedHeader = (): React.ReactNode => {
  const { user } = useAuthContext()
  return (
    <AppShell.Header px={16}>
      <FlexBox direction="row" justify="space-between">
        <FlexBox justify="flex-start" direction="row" gap={8}>
          <Link href="/" className={styles.title}>
            <h1>Voteboard</h1>
          </Link>
        </FlexBox>
        {user && (
          <FlexBox align="flex-end" gap={4}>
            <p className={styles.email}>{user.email}</p>
            <p className={styles.login}>でログイン中</p>
          </FlexBox>
        )}
      </FlexBox>
    </AppShell.Header>
  )
}
