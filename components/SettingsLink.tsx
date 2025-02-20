import { Href, Link } from 'expo-router'
import { HStack } from './ui/hstack'
import { Icon } from './ui/icon'
import { Text } from '@/components/ui/text'
import { ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react-native'
import { useTranslation } from 'react-i18next'

export type SettingsLinkType = {
  iconName?: LucideIcon
  subText: string
  path: Href
  preview?: string
}

export default function SettingsLink({
  path,
  iconName,
  subText,
  preview,
}: SettingsLinkType) {
  const {
    t,
    i18n: { language },
  } = useTranslation()

  return (
    <Link href={path}>
      <HStack
        className='justify-between basis-full items-center flex-1 h-14'
        space='lg'
      >
        <HStack className='items-center' space='lg'>
          {iconName ? <Icon as={iconName} size='xl' /> : null}
          <Text size='lg' className='text-neutral-900 whitespace-nowrap'>
            {t(subText)}
          </Text>
        </HStack>

        <HStack className='items-center justify-end flex-1' space='sm'>
          {preview ? (
            <Text
              isTruncated={true}
              className='text-neutral-900/70 line-clamp-2 flex-1 text-right'
              size='sm'
            >
              {preview}
            </Text>
          ) : null}
          <Icon as={language === 'ar-SA' ? ChevronLeft : ChevronRight} />
        </HStack>
      </HStack>
    </Link>
  )
}
