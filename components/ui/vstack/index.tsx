import React from 'react'
import type { VariantProps } from '@gluestack-ui/nativewind-utils'
import { View } from 'react-native'

import { vstackStyle } from './styles'
import { useTranslation } from 'react-i18next'

type IVStackProps = React.ComponentProps<typeof View> &
  VariantProps<typeof vstackStyle>

const VStack = React.forwardRef<React.ElementRef<typeof View>, IVStackProps>(
  ({ className, space, reversed, ...props }, ref) => {
    const { i18n } = useTranslation()
    const rtl = `${i18n.language === 'ar-SA' ? 'items-end' : ''}`

    const cn = `${className} ${rtl}`

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
