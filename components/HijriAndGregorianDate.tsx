import { use$ } from '@legendapp/state/react'
import { Center } from './ui/center'
import { Text } from './ui/text'
import { settings$ } from '@/store'

export default function HijriAndGregorianDate() {
  const { language } = use$(settings$)

  return (
    <Center className='bg-neutral-50 h-full px-10 rounded-full rounded-b-2xl'>
      <Text size='md'>
        {new Intl.DateTimeFormat(
          language === 'ar-SA' ? 'ar-u-nu-latn' : 'en-US',
          {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }
        ).format(Date.now())}
      </Text>
      <Text bold size='xl'>
        {new Intl.DateTimeFormat(
          language === 'ar-SA'
            ? 'ar-SA-u-ca-islamic-umalqura-nu-arab'
            : 'en-u-ca-islamic-umalqura-nu-latn',
          {
            day: 'numeric',
            month: 'long',
            weekday: 'long',
            year: 'numeric',
          }
        ).format(Date.now())}
      </Text>
    </Center>
  )
}
