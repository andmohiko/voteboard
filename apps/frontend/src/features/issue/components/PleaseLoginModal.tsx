import { FlexBox } from '~/components/Base/FlexBox'
import { BaseModal } from '~/components/Modals/BaseModal'
import { SignUpForm } from '~/features/auth/components/SignUpForm'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const PleaseLoginModal = ({
  isOpen,
  onClose,
}: Props): React.ReactNode => {
  return (
    <BaseModal
      title="ユーザー登録後に使用できます"
      isOpen={isOpen}
      onClose={onClose}
    >
      <FlexBox>
        <SignUpForm />
      </FlexBox>
    </BaseModal>
  )
}
