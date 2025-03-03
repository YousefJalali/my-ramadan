import type { PropsWithChildren, ReactElement } from 'react'
import { View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'

import { useBottomTabOverflow } from '@/components/ui/TabBarBackground'

const HEADER_HEIGHT = 350

type Props = PropsWithChildren<{
  headerImage: ReactElement
  height?: number
}>

export default function ParallaxScrollView({
  children,
  headerImage,
  height = HEADER_HEIGHT,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)
  const bottom = useBottomTabOverflow()
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-height, 0, height],
            [-height / 2, 0, height * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-height, 0, height],
            [2, 1, 1]
          ),
        },
      ],
    }
  })

  return (
    <View className='bg-background-50'>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom + 24 }}
      >
        <Animated.View
          className='bg-primary-600'
          style={[{ height, overflow: 'hidden' }, headerAnimatedStyle]}
        >
          {headerImage}
        </Animated.View>
        <View style={{ flex: 1 }}>{children}</View>
      </Animated.ScrollView>
    </View>
  )
}
