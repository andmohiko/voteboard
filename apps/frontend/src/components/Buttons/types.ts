import type { ButtonProps } from '@mantine/core'

export type ButtonImportance = 'primary' | 'secondary' | 'tertiary'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'

export const getButtonVariant = (
  importance: ButtonImportance,
): ButtonProps['variant'] => {
  if (importance === 'primary') {
    return 'filled'
  }
  if (importance === 'secondary') {
    return 'outline'
  }
  if (importance === 'tertiary') {
    return 'subtle'
  }
  return 'default'
}

export const buttonColor = '#323232'
