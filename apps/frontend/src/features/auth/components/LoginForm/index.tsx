import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordInput, TextInput } from '@mantine/core'
import { useForm } from 'react-hook-form'

import styles from './style.module.css'

import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { useLoadingContext } from '~/providers/LoadingProvider'
import type { LoginInputType } from '~/features/auth/types'
import { loginSchema } from '~/features/auth/types'
import { useToast } from '~/hooks/useToast'
import { errorMessage } from '~/utils/errorMessage'
import { useLogin } from '~/features/auth/hooks/useLogin'

export const LoginForm = (): React.ReactNode => {
  const { startLoading, stopLoading } = useLoadingContext()
  const { showErrorToast } = useToast()
  const { login } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginInputType>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginInputType) => {
    try {
      startLoading()
      await login(data)
    } catch (e) {
      showErrorToast('ログインに失敗しました', errorMessage(e))
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
      </FlexBox>
      <FlexBox gap={16} align="stretch">
        <BasicButton
          type="submit"
          loading={isSubmitting}
          disabled={!isValid}
          fullWidth
        >
          ログイン
        </BasicButton>
        <BasicButton href="/signup" importance="tertiary" fullWidth>
          新規登録はこちら
        </BasicButton>
      </FlexBox>
    </form>
  )
}
