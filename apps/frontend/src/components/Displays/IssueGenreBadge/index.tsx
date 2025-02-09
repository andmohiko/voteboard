import type { DefaultMantineColor } from '@mantine/core'
import { Badge } from '@mantine/core'
import { issueGenreLabels, type IssueGenre } from '@voteboard/common'

type Props = {
  genre: IssueGenre
}

export const IssueGenreBadge = ({ genre }: Props): React.ReactNode => {
  const getColor = (genre: IssueGenre): DefaultMantineColor => {
    switch (genre) {
      case 'FEATURE_REQUEST':
        return 'blue'
      case 'BUG_FIX':
        return 'red'
      case 'OTHER':
        return 'gray'
    }
  }
  const getLabel = (genre: IssueGenre): string => {
    return issueGenreLabels[genre]
  }
  return <Badge color={getColor(genre)}>{getLabel(genre)}</Badge>
}
