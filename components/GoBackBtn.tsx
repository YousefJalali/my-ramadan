import { ChevronLeft } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { Button, ButtonIcon } from './ui/button'

export default function GoBackBtn() {
  const router = useRouter()

  return (
    <Button size='xl' variant='link' onPress={() => router.back()}>
      <ButtonIcon as={ChevronLeft} className='h-6 w-6 text-neutral-950' />
    </Button>
  )
}
