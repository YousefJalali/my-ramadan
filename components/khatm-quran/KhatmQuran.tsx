import { HStack } from '../ui/hstack'
import { VStack } from '../ui/vstack'
import { Text } from '../ui/text'
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
} from '@/components/ui/checkbox'
import { CheckIcon } from '@/components/ui/icon'
import { useTranslation } from 'react-i18next'
import { progress$, khatmQuran$, QuranJuz } from '@/store'
import { cn } from '@/utils/cn'
import StatusBadge from '../StatusBadge'
// import ReadingPlanForm from './form/ReadingPlanForm'
import { Computed } from '@legendapp/state/react'

function formatSurahVerses(juzObject: QuranJuz, language = 'en-US') {
  const entries = juzObject.surah.map(({ name_en, name_ar, verses }) => {
    return `${language === 'en-US' ? name_en : name_ar} (${verses.join(':')})`
  })

  if (entries.length > 1) {
    return `${entries[0]} ${language === 'en-US' ? 'to' : 'الى'} ${
      entries[entries.length - 1]
    }`
  }
  return entries[0] ? `${entries[0]}` : ''
}

function getRandomMotivation(language = 'en-US') {
  const motivations: { [lang: string]: string[] } = {
    'en-US': [
      'Every verse you read brings you closer to Allah. Keep going! 🌟',
      'The Quran is a guide and mercy—open it and let its wisdom fill your heart 📖💡.',
      'Even a single ayah can bring light to your day. Take a moment to reflect ✨.',
      'Small steps lead to big rewards. Read a little today and stay consistent 📅💪.',
      'Your connection with the Quran is your connection with Allah. Strengthen it today! 🤲📖',
      'Don’t let a day pass without nourishing your soul. A few verses can make all the difference 🌿💖.',
      'The best habit is one done consistently, even if it’s small. Keep your journey going! 🛤️',
      'Reading the Quran brings peace to the heart and clarity to the mind 🕊️💭.',
      'Your future self will thank you for every moment spent with the Quran 🧘‍♀️🌙.',
      'Jannah is built one good deed at a time—let today’s be reading His words 🌸✨.',
    ],
    'ar-SA': [
      'كل آية تقرأها تقربك إلى الله. استمر! 🌟',
      'القرآن هداية ورحمة—افتحه ودع حكمته تملأ قلبك 📖💡.',
      'حتى آية واحدة يمكن أن تضئ يومك. خصص لحظة للتفكر ✨.',
      'الخطوات الصغيرة تؤدي إلى مكافآت كبيرة. اقرأ قليلاً اليوم وابقَ ثابتاً 📅💪.',
      'اتصالك بالقرآن هو اتصالك بالله. قَوِّي علاقتك اليوم! 🤲📖',
      'لا تدع يوماً يمر دون تغذية روحك. بضع آيات قد تحدث فرقاً كبيراً 🌿💖.',
      'أفضل العادات هي تلك التي تُمارس باستمرار، حتى وإن كانت صغيرة. استمر في رحلتك! 🛤️',
      'قراءة القرآن تجلب السكينة للقلب والوضوح للعقل 🕊️💭.',
      'سوف يشكرك مستقبلك على كل لحظة تقضيها مع القرآن 🧘‍♀️🌙.',
      'الجنة تُبنى بحسنات صغيرة. دع يومك اليوم يكون قراءة كلماته 🌸✨.',
    ],
  }

  // Select a random motivation based on the language
  const selectedMotivations = motivations[language] || motivations['en-US']
  const randomIndex = Math.floor(Math.random() * selectedMotivations.length)
  return selectedMotivations[randomIndex]
}

export default function QuranReading({
  day,
  trackerView = false,
  readOnly = false,
}: {
  day: number
  trackerView?: boolean
  readOnly?: boolean
}) {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const dayReading =
    progress$.days[day].quranReading.get() || khatmQuran$.nextReading()

  function checkHandler() {
    if (progress$.days[day].quranReading.get()) {
      console.log('uncheck')
      progress$.days[day].quranReading.set(null)
    } else {
      console.log('check')
      const next = khatmQuran$.nextReading()
      progress$.days[day].quranReading.set(next)
      // console.log(JSON.stringify(next))
    }

    // progress$.days[day].quranReading.set(
    //   readingProgress
    //     ? [dayReading.pages[0], dayReading.pages[1]]
    //     : null
    // )
  }

  return (
    <VStack
      className={`bg-neutral-100 p-3 rounded-2xl ${cn(
        trackerView,
        'bg-neutral-50 p-0'
      )}`}
    >
      {trackerView ? null : (
        <>
          <Text className='text-neutral-600' size='sm'>
            {t('try to finish Juz')} {dayReading.juz} {t('today')}
          </Text>
        </>
      )}
      <HStack space='xl' className={`mt-2 space-between w-full`}>
        <VStack className='flex-1 '>
          {trackerView && !progress$.days[day].quranReading.get() ? (
            <VStack space='sm'>
              <Text size='lg'>{t('No reading logged this day')}</Text>
              <Text size='sm'>{getRandomMotivation(language)}</Text>
            </VStack>
          ) : (
            <Text bold size='xl'>
              {formatSurahVerses(dayReading, language)}
            </Text>
          )}
          {/* <ReadingPlanForm /> */}
        </VStack>

        <Computed>
          {() =>
            readOnly ? (
              <StatusBadge
                isCompleted={!!progress$.days[day].quranReading.get()}
              />
            ) : (
              <Checkbox
                size='md'
                isInvalid={false}
                isDisabled={false}
                isChecked={!!progress$.days[day].quranReading.get()}
                value={'' + !!progress$.days[day].quranReading.get()}
                onChange={checkHandler}
              >
                <CheckboxIndicator className='rounded-full border-2 border-neutral-300 h-8 w-8'>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
              </Checkbox>
            )
          }
        </Computed>
      </HStack>
    </VStack>
  )
}
