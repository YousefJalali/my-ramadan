import React from 'react'
import type { VariantProps } from '@gluestack-ui/nativewind-utils'
import { View } from 'react-native'
import type { ViewProps } from 'react-native'
import { hstackStyle } from './styles'
import { useRTL } from '@/hooks/useRTL'

type IHStackProps = ViewProps & VariantProps<typeof hstackStyle>

const HStack = React.forwardRef<React.ElementRef<typeof View>, IHStackProps>(
  ({ className, space, reversed, ...props }, ref) => {
    const { cn } = useRTL({ className, style: 'flex-row-reverse' })

    return (
      <View
        className={hstackStyle({ space, reversed, class: cn })}
        {...props}
        ref={ref}
      />
    )
  }
)

HStack.displayName = 'HStack'

export { HStack }
