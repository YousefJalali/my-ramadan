import Rings from './Rings'
import { Text } from '@/components/ui/text'
import { VStack } from './ui/vstack'
import { HStack } from './ui/hstack'
import { useTranslation } from 'react-i18next'

type Props = {
  data: {
    prayers: number[]
    quran: number[]
    azkar: number[]
  }
}

export default function Progress({
  data: { prayers = [0, 5], quran = [0, 20], azkar = [0, 10] },
}: Props) {
  const { t } = useTranslation()

  const data: { [key: string]: number[] } = {
    [t('Prayers')]: prayers,
    [t('Quran Reading')]: quran,
    [t('Azkar')]: azkar,
  }

  return (
    <HStack className='bg-neutral-100 rounded-2xl mt-2 gap-2 items-center'>
      <Rings data={data} />

      <VStack className='gap-4 flex-1'>
        {Object.keys(data).map((p) => (
          <VStack key={p}>
            <Text className='capitalize'>{p}</Text>
            <Text bold size='xl'>
              {data[p][0]} / {data[p][1]}
            </Text>
          </VStack>
        ))}
      </VStack>
    </HStack>
  )
}
