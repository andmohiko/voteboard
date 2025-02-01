import { PasswordInput, TextInput } from '@mantine/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import styles from './style.module.css'

import { errorMessage } from '~/utils/errorMessage'
import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import type { SignUpInputType } from '~/features/auth/types'
import { signUpSchema } from '~/features/auth/types'
import { useToast } from '~/hooks/useToast'
import { useLoadingContext } from '~/providers/LoadingProvider'
import { useSignUp } from '~/features/auth/hooks/useSignUp'

export const SignUpForm = (): React.ReactNode => {
  const { showErrorToast } = useToast()
  const { signUp } = useSignUp()
  const { startLoading, stopLoading } = useLoadingContext()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpInputType>({
    resolver: zodResolver(signUpSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: SignUpInputType) => {
    try {
      startLoading()
      if (data.password !== data.confirmPassword) {
        showErrorToast('パスワードが一致しません')
        return
      }

      await signUp(data.email, data.password)
    } catch (e) {
      showErrorToast(errorMessage(e))
    } finally {
      stopLoading()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <FlexBox gap={32}>
        <TextInput
          label="メールアドレス"
          w="100%"
          {...register('email')}
          error={errors.email?.message}
        />
        <PasswordInput
          label="パスワード"
          w="100%"
          {...register('password')}
          error={errors.password?.message}
        />
        <PasswordInput
          label="パスワード(確認用)"
          w="100%"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </FlexBox>
      <FlexBox gap={16} align="stretch">
        <BasicButton
          type="submit"
          disabled={!isValid}
          loading={isSubmitting}
          fullWidth
        >
          新規登録
        </BasicButton>
        <BasicButton href="/login" importance="tertiary" fullWidth>
          ログインはこちら
        </BasicButton>
      </FlexBox>
    </form>
  )
}
