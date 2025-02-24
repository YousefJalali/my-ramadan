import { ReactNode } from 'react'
import { Heading } from './ui/heading'
import { HStack } from './ui/hstack'
import { Icon } from './ui/icon'
import { VStack } from './ui/vstack'
import { useTranslation } from 'react-i18next'
import { Href, Link } from 'expo-router'

type Props = {
  children: ReactNode
  icon?: any
  title: string
  link?: Href
  className?: string
}

export default function Section({
  children,
  icon,
  title,
  link,
  className = '',
}: Props) {
  const { t } = useTranslation()

  return (
    <VStack className={`mx-6 flex-1 ${className}`}>
      <HStack className='justify-between items-center mb-2'>
        <HStack className='items-center' space='sm'>
          <Heading size='xl'>{t(title)}</Heading>
          {icon ? <Icon as={icon} size='xl' /> : null}
        </HStack>

        {link ? <Link href={link}>More</Link> : null}
      </HStack>

      {children}
    </VStack>
  )
}
