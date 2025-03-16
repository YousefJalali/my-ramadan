import { Href, Link } from 'expo-router'
import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
import { Text } from '@/components/ui/text'
import { ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'
import * as WebBrowser from 'expo-web-browser'
import { Pressable } from 'react-native'

export type SettingsLinkType =
  | {
      iconName?: LucideIcon
      subText: string
      path: Href // Ensures path is relative
      preview?: string
      openInWebBrowser?: false
    }
  | {
      iconName?: LucideIcon
      subText: string
      path: string // external url
      preview?: string
      openInWebBrowser: true // Required when path is a string
    }
  | {
      iconName?: LucideIcon
      subText: string
      path: string | Href
      preview?: string
      openInWebBrowser?: false
    }

export default function SettingsLink({
  path,
  iconName,
  subText,
  preview,
  openInWebBrowser,
}: SettingsLinkType) {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  const content = (
    <HStack className='justify-between items-center flex-1 h-14' space='lg'>
      <HStack className='items-center max-w-[95%]' space='lg'>
        {iconName ? <Icon as={iconName} size='xl' /> : null}

        <Text
          size='lg'
          className='text-typography-900 leading-normal line-clamp-1'
        >
          {t(subText)}
        </Text>
      </HStack>

      <HStack className='items-center justify-end flex-1' space='sm'>
        {preview ? (
          <Text
            isTruncated={true}
            className='text-typography-900/70 line-clamp-2 flex-1 !text-right'
            size='sm'
          >
            {t(preview)}
          </Text>
        ) : null}

        <Icon as={language === 'ar-SA' ? ChevronLeft : ChevronRight} />
      </HStack>
    </HStack>
  )

  if (openInWebBrowser) {
    return (
      <Pressable
        onPress={async () => {
          await WebBrowser.openBrowserAsync(path)
        }}
      >
        {content}
      </Pressable>
    )
  }

  return (
    //@ts-ignore
    <Link href={path} className='flex-1'>
      {content}
    </Link>
  )
}
