import classNames from 'classnames'

import styles from './style.module.css'
import type { FontSizes, TextColor } from './types'

type Props = {
  children: React.ReactNode
  weight?: 'normal' | 'bold'
  size?: FontSizes
  color?: TextColor
}

export const BaseText = ({
  children,
  weight = 'normal',
  size = 'md',
  color = 'black',
}: Props): React.ReactElement => {
  const getFontSize = (size: FontSizes): number => {
    if (size === 'xl') {
      return 20
    }
    if (size === 'lg') {
      return 16
    }
    if (size === 'sm') {
      return 12
    }
    if (size === 'xs') {
      return 10
    }
    return 14
  }
  const textClass = classNames(styles.baseText, styles[`_${color}`])

  return (
    <p
      style={{
        fontSize: getFontSize(size),
        letterSpacing: 0.07,
        fontWeight: weight === 'normal' ? 400 : 700,
      }}
      className={textClass}
    >
      {children}
    </p>
  )
}
