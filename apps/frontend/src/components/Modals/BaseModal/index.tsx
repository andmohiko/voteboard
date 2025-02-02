import { Modal } from '@mantine/core'

import styles from './style.module.css'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  title: string
  size?: 'auto' | '95%'
}

export const BaseModal = ({
  children,
  isOpen,
  onClose,
  title,
  size = '95%',
}: Props): React.ReactNode => {
  return (
    <Modal
      title={<p className={styles.title}>{title}</p>}
      opened={isOpen}
      onClose={onClose}
      size={size}
      overlayProps={{
        blur: 2,
        opacity: 0.9,
      }}
    >
      {children}
    </Modal>
  )
}
