import React from 'react'
import type { VariantProps } from '@gluestack-ui/nativewind-utils'
import { View } from 'react-native'
import type { ViewProps } from 'react-native'
import { hstackStyle } from './styles'
import { useTranslation } from 'react-i18next'

type IHStackProps = ViewProps & VariantProps<typeof hstackStyle>

const HStack = React.forwardRef<React.ElementRef<typeof View>, IHStackProps>(
  ({ className, space, reversed, ...props }, ref) => {
    const { i18n } = useTranslation()
    const rtl = `${
      i18n.language === 'ar-SA' ? 'items-end flex-row-reverse' : ''
    }`

    const cn = `${className} ${rtl}`

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
