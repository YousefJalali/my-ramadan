import { Check, X } from 'lucide-react-native'
import { Badge, BadgeIcon, BadgeText } from './ui/badge'
import { useTranslation } from 'react-i18next'

export default function StatusBadge({ isCompleted }: { isCompleted: boolean }) {
  const { t } = useTranslation()

  return (
    <Badge
      size='lg'
      variant='outline'
      action={isCompleted ? 'success' : 'error'}
      className='gap-2 rounded-xl h-8'
    >
      <BadgeText>{t(isCompleted ? 'completed' : 'missed')}</BadgeText>
      <BadgeIcon as={isCompleted ? Check : X} />
    </Badge>
  )
}
