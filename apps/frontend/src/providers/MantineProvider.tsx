import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/notifications/styles.css'
import { MantineProvider as MantineNativeProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

type Props = {
  children: React.ReactNode
}

export const MantineProvider = ({ children }: Props): React.ReactNode => {
  return (
    <MantineNativeProvider>
      <Notifications position="top-center" />
      {children}
    </MantineNativeProvider>
  )
}
