import Rings from './Rings'
import { Text } from '@/components/ui/text'
import { VStack } from './ui/vstack'
import { HStack } from './ui/hstack'
import { useTranslation } from 'react-i18next'

type Props = {
  data: {
    [key: string]: number[]
  }
}

export default function Progress({ data }: Props) {
  const { t } = useTranslation()

  return (
    <HStack className='bg-neutral-100 rounded-2xl mt-2 gap-2 items-center'>
      <Rings data={data} />

      <VStack className='gap-4 flex-1'>
        {Object.keys(data).map((p) => (
          <VStack key={p}>
            <Text className='capitalize'>{t(p)}</Text>
            <Text bold size='xl'>
              {data[p][0]} / {data[p][1]}
            </Text>
          </VStack>
        ))}
      </VStack>
    </HStack>
  )
}
