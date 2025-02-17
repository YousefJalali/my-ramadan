import { ReactNode } from 'react'
import { Heading } from './ui/heading'
import { HStack } from './ui/hstack'
import { Icon } from './ui/icon'
import { Link, LinkText } from './ui/link'
import { VStack } from './ui/vstack'
import { useTranslation } from 'react-i18next'

type Props = {
  children: ReactNode
  icon?: any
  title: string
  link?: string
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
      <HStack className='space-between w-full '>
        <HStack className='items-center mb-2' space='sm'>
          <Heading size='xl'>{t(title)}</Heading>
          {icon ? <Icon as={icon} size='xl' /> : null}
        </HStack>

        {link ? (
          <Link>
            <LinkText>More</LinkText>
          </Link>
        ) : null}
      </HStack>

      {children}
    </VStack>
  )
}
