import React from 'react'
import type { VariantProps } from '@gluestack-ui/nativewind-utils'
import { View } from 'react-native'

import { vstackStyle } from './styles'
import { useRTL } from '@/hooks/useRTL'

type IVStackProps = React.ComponentProps<typeof View> &
  VariantProps<typeof vstackStyle>

const VStack = React.forwardRef<React.ElementRef<typeof View>, IVStackProps>(
  ({ className, space, reversed, ...props }, ref) => {
    const { cn } = useRTL({ className, style: 'items-end' })

    return (
      <View
        className={vstackStyle({ space, reversed, class: cn })}
        {...props}
        ref={ref}
      />
    )
  }
)

VStack.displayName = 'VStack'

export { VStack }
