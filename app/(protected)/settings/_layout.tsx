import { Heading } from '@/components/ui/heading'
import { Slot } from 'expo-router'
import { useGlobalSearchParams, useSegments } from 'expo-router/build/hooks'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'
import PageListLayout from '@/components/PageListLayout'

function urlToTitle(url: string) {
  return url.replaceAll('-', ' ').trim()
}

export default function SettingsLayout() {
  const segments = useSegments()
  const { t } = useTranslation()
  const { method } = useGlobalSearchParams()

  let title = urlToTitle(segments[segments.length - 1])

  if (method && typeof method === 'string') title = urlToTitle(method)

  return (
    <PageListLayout pageTitle={title}>
      {(scrollHandler) => (
        <ScrollView
          onScroll={scrollHandler}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <Heading size='3xl' className='capitalize my-6'>
            {t(title)}
          </Heading>
          <Slot />
        </ScrollView>
      )}
    </PageListLayout>
  )
}
