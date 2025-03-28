import { settings$ } from '@/stores/store'
import { Button, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Pressable } from '@/components/ui/pressable'
import { Text } from '@/components/ui/text'
import { useTranslation } from 'react-i18next'
import { use$ } from '@legendapp/state/react'

export default function RecentLocations() {
  const { t } = useTranslation()
  const history = use$(settings$.location.history)

  function onPress(index: number) {
    const selected = settings$.location.history.get()[index]
    settings$.location.change(selected)
  }

  return (
    history.length > 0 && (
      <VStack className='flex-1 border-b border-background-100 mb-2'>
        <HStack className='justify-between items-center w-full'>
          <Heading size='xs' className='uppercase text-typography-700'>
            {t('recent')}
          </Heading>
          <Button
            size='sm'
            variant='link'
            onPress={() => settings$.location.clearHistory()}
          >
            <ButtonText>{t('clear')}</ButtonText>
          </Button>
        </HStack>

        <VStack className='w-full mb-1'>
          {settings$.location.history.get().map(({ country, city }, index) => (
            <Pressable key={city} onPress={() => onPress(index)}>
              <HStack className='py-2' space='sm'>
                <Text className='clamp-1'>
                  {t(city)}, {t(country)}
                </Text>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </VStack>
    )
  )
}
