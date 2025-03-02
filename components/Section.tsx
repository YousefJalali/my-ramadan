import { ReactNode } from 'react'
import { Heading } from '@/components/ui/heading'
import { HStack } from '@/components/ui/hstack'
import { Icon } from '@/components/ui/icon'
import { VStack } from '@/components/ui/vstack'
import { useTranslation } from 'react-i18next'
import { Href, Link } from 'expo-router'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react-native'

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
  const {
    t,
    i18n: { language },
  } = useTranslation()

  return (
    <VStack className={`mx-6 flex-1 ${className}`}>
      <HStack className='justify-between items-center mb-2'>
        <HStack className='items-center' space='sm'>
          <Heading className='!font-semibold' size='xl'>
            {t(title)}
          </Heading>
          {icon ? <Icon as={icon} size='xl' /> : null}
        </HStack>

        {link ? (
          <Link href={link}>
            <Button variant='link' className='gap-1' disabled>
              <ButtonText>{t('more')}</ButtonText>
              <ButtonIcon
                as={language === 'ar-SA' ? ChevronLeft : ChevronRight}
              />
            </Button>
          </Link>
        ) : null}
      </HStack>

      {children}
    </VStack>
  )
}
