import { ReactNode } from 'react'
import { Heading } from './ui/heading'
import { HStack } from './ui/hstack'
import { Icon } from './ui/icon'
import { Link, LinkText } from './ui/link'
import { VStack } from './ui/vstack'

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
  return (
    <VStack className={`mx-6 flex-1 ${className}`}>
      <HStack className='space-between w-full '>
        <HStack className='items-center gap-2 flex-1'>
          <Heading size='xl' className='mb-1'>
            {title}
          </Heading>
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
