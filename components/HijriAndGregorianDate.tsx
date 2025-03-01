import { use$ } from '@legendapp/state/react'
import { Center } from './ui/center'
import { Text } from './ui/text'
import { settings$ } from '@/store'
import Svg, { Path } from 'react-native-svg'
import { colors } from './ui/gluestack-ui-provider/config'

export default function HijriAndGregorianDate() {
  const { language } = use$(settings$)

  return (
    <Center className='w-full h-full relative'>
      <Svg
        viewBox='0 0 1440 320'
        style={{ transform: 'scale(1.5)', position: 'absolute', top: -40 }}
      >
        <Path
          fill={`rgb(${colors.light['--color-neutral-50']})`}
          fill-opacity='1'
          d='M0,96L18.5,90.7C36.9,85,74,75,111,106.7C147.7,139,185,213,222,224C258.5,235,295,181,332,149.3C369.2,117,406,107,443,122.7C480,139,517,181,554,176C590.8,171,628,117,665,133.3C701.5,149,738,235,775,256C812.3,277,849,235,886,229.3C923.1,224,960,256,997,250.7C1033.8,245,1071,203,1108,208C1144.6,213,1182,267,1218,256C1255.4,245,1292,171,1329,144C1366.2,117,1403,139,1422,149.3L1440,160L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z'
        ></Path>
      </Svg>
      <Center className='w-full h-full px-10 mt-16'>
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
    </Center>
  )
}
