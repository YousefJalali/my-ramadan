import { Heading } from '@/components/ui/heading'
import { Icon } from '@/components/ui/icon'
import { Pressable } from '@/components/ui/pressable'
import { ScrollView } from '@/components/ui/scroll-view'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import flashback from '@/constants/flashback'
import { slugify } from '@/utils/slugify'
import Markdown from '@ronradtke/react-native-markdown-display'
import {
  Link,
  useRouter,
  router,
  usePathname,
  useSegments,
  useLocalSearchParams,
  Stack,
} from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { useEffect } from 'react'

export default function FlashbackDetails() {
  const { back } = useRouter()
  const { title } = useLocalSearchParams()

  // useEffect(() => {
  //   const ha = flashback.map((f) =>
  //     f.map((c) => ({ ...c, id: slugify(c.title), details: '' }))
  //   )
  //   console.log(ha)
  // }, [])

  const article = flashback[0].find((c) => c.id === title)

  return (
    <>
      <Stack.Screen
        options={{
          title: article?.title,
          headerLeft: () => <></>,
          headerRight: () => (
            <Pressable onPress={() => back()}>
              <Icon as={ChevronLeft} className='h-8 w-8 -ml-3' />
            </Pressable>
          ),
        }}
      />

      <VStack>
        <ScrollView className='p-6'>
          <Heading size='3xl'>{title}</Heading>
          {/* <Link href='/'> */}

          {/* </Link> */}
          <Markdown>{article?.details || ''}</Markdown>
        </ScrollView>
      </VStack>
    </>
  )
}
