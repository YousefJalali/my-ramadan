import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { Button, ButtonIcon } from './ui/button'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'

export default function GoBackBtn() {
  const router = useRouter()
  const {
    i18n: { language },
  } = useTranslation()

  const isRTL = language === 'ar-SA'

  const left = Platform.OS === 'ios' ? ChevronLeft : ArrowLeft
  const right = Platform.OS === 'ios' ? ChevronRight : ArrowRight

  return (
    <Button
      size='xl'
      variant='link'
      onPress={() => router.back()}
      className={`px-4 ${isRTL ? '-mr-4' : '-ml-4'}`}
    >
      <ButtonIcon
        as={isRTL ? right : left}
        className='h-7 w-7 text-neutral-950 '
      />
    </Button>
  )
}
