import { ScrollView, Dimensions } from 'react-native'
import { Text } from '@/components/ui/text'
import { useEffect, useState, useTransition } from 'react'
import { Link } from 'expo-router'
import { Card } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import { HStack } from './ui/hstack'
import { VStack } from './ui/vstack'
import { Center } from './ui/center'
import flashback from '@/constants/flashback'
import Section from './Section'
import { slugify } from '@/utils/slugify'
import { useTranslation } from 'react-i18next'

const WIDTH = Dimensions.get('screen').width - 48

type Story = {
  id: string
  title: string
  description: string
}

export default function OnThisDayCard({ day }: { day: number }) {
  const [stories, setStories] = useState<Story[]>([])
  const [isPending, startTransition] = useTransition()

  const {
    t,
    i18n: { language },
  } = useTranslation()

  async function getStories() {
    try {
      setStories(flashback[language][day - 1])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    startTransition(() => {
      getStories()
    })
  }, [day, language])

  return (
    <Section title={t('On This Day')}>
      {isPending ? (
        <Center>
          <Text>{t('Loading...')}</Text>
        </Center>
      ) : (
        <ScrollView horizontal className='-mx-6'>
          <HStack className='gap-6 mx-6'>
            {stories.map((f) => {
              return (
                <VStack
                  key={f.id}
                  className='flex-1 bg-neutral-100 p-4 rounded-2xl'
                  style={{ width: stories.length > 1 ? WIDTH * 0.9 : WIDTH }}
                  space='xs'
                >
                  <Heading size='md' className='mb-1'>
                    {f.title}
                  </Heading>

                  <Text size='sm'>{f.description}</Text>

                  <Link
                    href={`/on-this-day/${slugify(f.id)}`}
                    className='mt-2 text-left'
                  >
                    {t('Read More')}
                  </Link>
                </VStack>
              )
            })}
          </HStack>
        </ScrollView>
      )}
    </Section>
  )
}
