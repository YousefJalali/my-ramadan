import { Fragment, useState } from 'react'
import { HStack } from './ui/hstack'
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
import { useTranslation } from 'react-i18next'
import { morning } from '@/constants/adhkar'
import { Box } from './ui/box'
import { ScrollView } from 'react-native'
import { Heading } from './ui/heading'
import { Divider } from './ui/divider'

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

export default function Adhkar() {
  const [selectedPrayer, setSelectedPrayer] = useState<null | string>(null)

  const { t } = useTranslation()

  return (
    <>
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
        snapPoints={[90]}
      >
        <ActionsheetBackdrop onPress={() => setSelectedPrayer(null)} />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 48 }}
            stickyHeaderIndices={[0]}
          >
            <VStack className='pb-4 pt-2 bg-white'>
              <Heading size='xl'>Morning Adhkar</Heading>
            </VStack>
            {morning.map((item) => (
              <VStack
                key={item.id}
                className='mb-4 bg-neutral-100 p-2 rounded-2xl'
              >
                <VStack>
                  {item.en.map((e, i) => (
                    <Fragment key={i}>
                      <Text>{e}</Text>
                      <Divider className='my-2 bg-neutral-300' />
                    </Fragment>
                  ))}
                </VStack>
                <Text bold className='px-2'>
                  Repeat x{item.repeat}
                </Text>
              </VStack>
            ))}
          </ScrollView>
          {/* <Text>
            <Markdown>{morning}</Markdown>
          </Text> */}
        </ActionsheetContent>
      </Actionsheet>
    </>
  )
}
