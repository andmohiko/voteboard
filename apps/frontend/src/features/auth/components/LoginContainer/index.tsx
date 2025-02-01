import { FlexBox } from '~/components/Base/FlexBox'
import { TitleText } from '~/components/Typography/TitleText'
import { LoginForm } from '~/features/auth/components/LoginForm'

export const LoginContainer = (): React.ReactNode => {
  return (
    <FlexBox gap={64} justify="flex-start" pt={64}>
      <TitleText>ログイン</TitleText>
      <LoginForm />
    </FlexBox>
  )
}
