import React from 'react'

import type { VariantProps } from '@gluestack-ui/nativewind-utils'
import { Text as RNText } from 'react-native'
import { textStyle } from './styles'
import { useTranslation } from 'react-i18next'
import { useRTL } from '@/hooks/useRTL'

type ITextProps = React.ComponentProps<typeof RNText> &
  VariantProps<typeof textStyle>

const Text = React.forwardRef<React.ElementRef<typeof RNText>, ITextProps>(
  (
    {
      className,
      isTruncated,
      bold,
      underline,
      strikeThrough,
      size = 'md',
      sub,
      italic,
      highlight,
      ...props
    },
    ref
  ) => {
    const { cn } = useRTL({ className, style: 'text-right' })

    return (
      <RNText
        className={textStyle({
          isTruncated,
          bold,
          underline,
          strikeThrough,
          size,
          sub,
          italic,
          highlight,
          class: cn,
        })}
        {...props}
        ref={ref}
      />
    )
  }
)

Text.displayName = 'Text'

export { Text }
