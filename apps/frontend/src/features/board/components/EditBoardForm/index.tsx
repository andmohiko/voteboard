import { Textarea, TextInput } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'

import styles from './style.module.css'

import { useCreateBoard } from '~/features/board/hooks/useCreateBoard'
import type { EditBoardInputType } from '~/features/board/types'
import { editBoardSchema } from '~/features/board/types'
import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { useToast } from '~/hooks/useToast'
import { useLoadingContext } from '~/providers/LoadingProvider'
import { errorMessage } from '~/utils/errorMessage'

type Props = {
  onClose: () => void
}

export const EditBoardForm = ({ onClose }: Props): React.ReactNode => {
  const { showSuccessToast, showErrorToast } = useToast()
  const { push } = useRouter()
  const { startLoading, stopLoading } = useLoadingContext()
  const { createBoard } = useCreateBoard()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditBoardInputType>({
    resolver: zodResolver(editBoardSchema),
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const onSubmit = async (data: EditBoardInputType) => {
    startLoading()
    try {
      const board = await createBoard(data)
      showSuccessToast('ボードを作成しました')
      onClose()
      await push(`/boards/${board.id}`)
    } catch (error) {
      showErrorToast('求人の作成に失敗しました', errorMessage(error))
    } finally {
      stopLoading()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FlexBox width="500px" gap={16}>
        <TextInput
          label="タイトル"
          {...register('title')}
          error={errors.title?.message}
          w="100%"
        />
        <Textarea
          label="説明"
          {...register('description')}
          error={errors.description?.message}
          autosize
          minRows={4}
          maxRows={8}
          w="100%"
        />
      </FlexBox>
      <BasicButton type="submit">保存</BasicButton>
    </form>
  )
}
