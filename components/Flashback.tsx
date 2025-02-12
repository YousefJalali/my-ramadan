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

const WIDTH = Dimensions.get('screen').width - 48

type Flashback = {
  id: string
  title: string
  description: string
}

export default function Flashback({ day }: { day: number }) {
  const [flashbacks, setFlashbacks] = useState<Flashback[]>([])
  const [isPending, startTransition] = useTransition()

  async function getFlashbacks() {
    try {
      // const q = query(collection(db, 'flashbacks'), where('day', '==', day))
      // const querySnapshot = await getDocs(q)
      // const d: Flashback[] = []
      // querySnapshot.forEach((doc) => {
      //   d.push({
      //     id: doc.id,
      //     ...doc.data(),
      //   } as Flashback)
      // })
      // setFlashbacks(d)
      setFlashbacks(flashback[day - 1])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    startTransition(() => {
      getFlashbacks()
    })
  }, [day])

  return (
    <Section title='On This Day' className=''>
      {isPending ? (
        <Center>
          <Text>Loading...</Text>
        </Center>
      ) : (
        <ScrollView horizontal className='-mx-6'>
          <HStack className='gap-6 mx-6'>
            {flashbacks.map((f) => (
              <Card
                key={f.id}
                size='lg'
                variant='filled'
                className='bg-neutral-100'
                style={{ width: flashbacks.length > 1 ? WIDTH * 0.9 : WIDTH }}
              >
                <Heading size='md' className='mb-1'>
                  {f.title}
                </Heading>
                <Text size='sm'>{f.description}</Text>
                <Link href={`/flashback/${slugify(f.title)}`}>Read More</Link>
              </Card>
            ))}
          </HStack>
        </ScrollView>
      )}
    </Section>
  )
}
