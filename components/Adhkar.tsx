import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import { Icon } from '@/components/ui/icon'
import {
  AlarmClock,
  BedDouble,
  Lamp,
  LucideIcon,
  MoonStar,
} from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import { Href, Link } from 'expo-router'

const prayers: { prayer: string; icon: LucideIcon; href: Href }[] = [
  {
    prayer: 'Morning Prayers',
    icon: AlarmClock,
    href: '/(protected)/adhkar/category/0',
  },
  {
    prayer: 'Evening Prayers',
    icon: MoonStar,
    href: '/(protected)/adhkar/category/0',
  },
  {
    prayer: 'Before Sleep Prayers',
    icon: Lamp,
    href: '/(protected)/adhkar/category/1',
  },
  {
    prayer: 'Wake Up Prayers',
    icon: BedDouble,
    href: '/(protected)/adhkar/category/2',
  },
]

export default function Adhkar() {
  const { t } = useTranslation()

  return (
    <HStack className='gap-2 flex-wrap w-full'>
      {prayers.map(({ prayer, icon, href }) => (
        <Link key={prayer} href={href}>
          <VStack className='border border-neutral-200 p-3 rounded-2xl gap-2.5'>
            <Icon as={icon} size='xl' className='!text-primary-700' />
            <Text>{t(prayer)}</Text>
          </VStack>
        </Link>
      ))}
    </HStack>
  )
}
