import type { AppProps } from 'next/app'

import { Providers } from '~/providers'
import '~/styles/globals.css'
import '~/styles/reset.css'
import '~/styles/variables.css'

// eslint-disable-next-line @typescript-eslint/naming-convention
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp
