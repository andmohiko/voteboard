import { Select, Textarea, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type BoardWithIssuesWithVoteCount } from '@voteboard/common'

import styles from './style.module.css'

import type { EditIssueInputType } from '~/features/issue/types'
import { editIssueSchema, issueGenreOptions } from '~/features/issue/types'
import { useCreateIssue } from '~/features/issue/hooks/useCreateIssue'
import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { useToast } from '~/hooks/useToast'
import { useLoadingContext } from '~/providers/LoadingProvider'
import { errorMessage } from '~/utils/errorMessage'

type Props = {
  onClose: () => void
  board: BoardWithIssuesWithVoteCount
}

export const EditIssueForm = ({ onClose, board }: Props): React.ReactNode => {
  const { showSuccessToast, showErrorToast } = useToast()
  const { startLoading, stopLoading } = useLoadingContext()
  const { createIssue } = useCreateIssue(board.id)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditIssueInputType>({
    resolver: zodResolver(editIssueSchema),
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const onSubmit = async (data: EditIssueInputType) => {
    startLoading()
    try {
      await createIssue(data)
      showSuccessToast('チケットを作成しました')
      onClose()
    } catch (error) {
      showErrorToast('チケットの作成に失敗しました', errorMessage(error))
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
        <Controller
          name="genre"
          control={control}
          render={({ field }) => {
            return (
              <Select
                label="要望ジャンル"
                data={issueGenreOptions}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                w="100%"
              />
            )
          }}
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
