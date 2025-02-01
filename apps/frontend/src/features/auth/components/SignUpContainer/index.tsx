import { FlexBox } from '~/components/Base/FlexBox'
import { TitleText } from '~/components/Typography/TitleText'
import { SignUpForm } from '~/features/auth/components/SignUpForm'

export const SignUpContainer = (): React.ReactNode => {
  return (
    <FlexBox gap={64} justify="flex-start" pt={64}>
      <TitleText>新規登録</TitleText>
      <SignUpForm />
    </FlexBox>
  )
}
