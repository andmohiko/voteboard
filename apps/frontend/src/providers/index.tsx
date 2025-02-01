import { LoadingProvider } from '~/providers/LoadingProvider'
import { MantineProvider } from '~/providers/MantineProvider'
import { AuthProvider } from '~/providers/AuthProvider'

type Props = {
  children: React.ReactNode
}

export const Providers = ({ children }: Props): React.ReactNode => {
  return (
    <MantineProvider>
      <LoadingProvider>
        <AuthProvider>{children}</AuthProvider>
      </LoadingProvider>
    </MantineProvider>
  )
}
