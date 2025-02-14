import { useState } from 'react'
import { Heading } from './ui/heading'
import { HStack } from './ui/hstack'
import { Link, LinkText } from './ui/link'
import { Text } from './ui/text'
import { VStack } from './ui/vstack'
import { Icon } from '@/components/ui/icon'
import { AlarmClock, BedDouble, Lamp, MoonStar } from 'lucide-react-native'
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from '@/components/ui/actionsheet'
import { Pressable } from './ui/pressable'
import Markdown from '@ronradtke/react-native-markdown-display'
import { morning } from '@/constants/azkar'
import Section from './Section'
import { useTranslation } from 'react-i18next'

const prayers = [
  {
    prayer: 'Morning Prayers',
    icon: AlarmClock,
  },
  {
    prayer: 'Evening Prayers',
    icon: MoonStar,
  },
  {
    prayer: 'Before Sleep Prayers',
    icon: Lamp,
  },
  {
    prayer: 'Wake Up Prayers',
    icon: BedDouble,
  },
]

export default function Azkar() {
  const [selectedPrayer, setSelectedPrayer] = useState<null | string>(null)

  const { t } = useTranslation()

  return (
    <Section title={t('Azkar')}>
      <HStack className='gap-2 flex-wrap w-full'>
        {prayers.map(({ prayer, icon }) => (
          <Pressable key={prayer} onPress={() => setSelectedPrayer(prayer)}>
            <VStack className='border border-neutral-200 p-3 rounded-2xl gap-2.5'>
              <Icon as={icon} size='xl' className='!text-primary-700' />
              <Text>{t(prayer)}</Text>
            </VStack>
          </Pressable>
        ))}
      </HStack>

      <Actionsheet
        isOpen={!!selectedPrayer}
        onClose={() => setSelectedPrayer(null)}
      >
        <ActionsheetBackdrop onPress={() => setSelectedPrayer(null)} />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Text>
            <Markdown>{morning}</Markdown>
          </Text>
        </ActionsheetContent>
      </Actionsheet>
    </Section>
  )
}
