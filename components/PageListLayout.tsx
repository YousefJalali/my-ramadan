import { Memo, useObservable } from '@legendapp/state/react'
import { VStack } from '@/components/ui/vstack'
import { Stack } from 'expo-router'
import { useTranslation } from 'react-i18next'
import {
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'
import { Heading } from '@/components/ui/heading'
import { ReactNode, useRef } from 'react'

export default function PageListLayout({
  pageTitle,
  children,
}: {
  pageTitle: string
  children: (
    scrollHandler: (e: NativeSyntheticEvent<NativeScrollEvent>) => void,
    getHeaderHeight: (e: LayoutChangeEvent) => void
  ) => ReactNode
}) {
  const showTitle$ = useObservable(false)
  const headerHeight$ = useObservable(50)
  const ref = useRef(null)

  const {
    t,
    i18n: { language },
  } = useTranslation()

  function getHeaderHeight(e: LayoutChangeEvent) {
    headerHeight$.set(e.nativeEvent.layout.height + 20)
  }

  function scrollHandler(e: NativeSyntheticEvent<NativeScrollEvent>) {
    if (e.nativeEvent.contentOffset.y > headerHeight$.get()) {
      showTitle$.set(true)
    } else {
      showTitle$.set(false)
    }
  }

  return (
    <>
      <Memo>
        {() => (
          <Stack.Screen
            options={{
              title: showTitle$.get() ? t(pageTitle) : '',
              headerShadowVisible: showTitle$.get() ? true : false,
              headerTitle: (props) => (
                <Heading
                  {...props}
                  ref={ref}
                  size={language === 'ar-SA' ? 'xl' : 'lg'}
                  className={`align-bottom line-clamp-1 ${
                    language === 'ar-SA' ? 'self-end' : ''
                  }`}
                />
              ),
            }}
          />
        )}
      </Memo>

      <VStack className='flex-1 px-6 bg-background-50'>
        {children(scrollHandler, getHeaderHeight)}
      </VStack>
    </>
  )
}
