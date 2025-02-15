import React from 'react'
import { HStack } from '@/components/ui/hstack'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import {
  Bell,
  BookText,
  ChevronLeft,
  ChevronRight,
  CircleUserRound,
  Languages,
  type LucideIcon,
} from 'lucide-react-native'
import { Icon } from '@/components/ui/icon'
import { Button, ButtonText } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { ScrollView } from '@/components/ui/scroll-view'
import { Divider } from '@/components/ui/divider'
import { Href, Link } from 'expo-router'
import Profile from '@/components/profile/Profile'
import LogoutBtn from '@/components/profile/LogoutBtn'
import { session$ } from '@/store'
import { use$ } from '@legendapp/state/react'
import { useTranslation } from 'react-i18next'

type Section = {
  sectionTitle: string
  list: {
    iconName: LucideIcon
    subText: string
    path: Href
  }[]
}

const sections: Section[] = [
  {
    sectionTitle: 'Settings',
    list: [
      {
        iconName: CircleUserRound,
        subText: 'Personal Information',
        path: '/settings/personal-information',
      },
      {
        iconName: Languages,
        subText: 'language',
        path: '/settings/language',
      },
      {
        iconName: Bell,
        subText: 'notifications',
        path: '/settings/notifications',
      },
    ],
  },
  {
    sectionTitle: 'Legal',
    list: [
      {
        iconName: BookText,
        subText: 'terms of service',
        path: '/settings/terms-of-service',
      },
      {
        iconName: BookText,
        subText: 'privacy policy',
        path: '/settings/privacy-policy',
      },
    ],
  },
]

export default function Settings() {
  const session = use$(session$)
  const {
    t,
    i18n: { language },
  } = useTranslation()

  return (
    <VStack className='h-full w-full my-12'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 160,
          flexGrow: 1,
        }}
      >
        <VStack className='h-full w-full pb-8' space='4xl'>
          <Profile />

          <VStack className='mx-6' space='2xl'>
            {/* invite */}
            {/* <HStack
              className='py-5 px-6 rounded-xl bg-neutral-100 justify-between items-center w-full'
              space='2xl'
            >
              <HStack space='2xl' className='items-center'>
                <VStack>
                  <Text className='text-typography-900 text-lg' size='lg'>
                    Invite & get rewards
                  </Text>
                  <Text className='font-roboto text-sm '>
                    Your code r45dAsdeK8
                  </Text>
                </VStack>
              </HStack>
              <Button className='bg-primary-400 active:bg-background-0'>
                <ButtonText className='text-primary-50 text-sm'>
                  Invite
                </ButtonText>
              </Button>
            </HStack> */}

            {/* App Settings */}
            {sections.map(({ sectionTitle, list }) => (
              <VStack key={sectionTitle}>
                <Heading className='mt-6 mb-3' size='xl'>
                  {t(sectionTitle)}
                </Heading>
                <VStack className='justify-between items-center'>
                  {list.map(({ iconName, subText, path }, index) => {
                    //hide personal information
                    if (!session && subText === 'Personal Information')
                      return null
                    return (
                      <React.Fragment key={subText}>
                        <Link href={path}>
                          <HStack className='justify-between items-center w-full flex-1 py-3'>
                            <HStack className='items-center' space='lg'>
                              <Icon as={iconName} size='xl' />
                              <Text size='lg' className='text-neutral-900'>
                                {t(subText)}
                              </Text>
                            </HStack>
                            <Icon
                              as={
                                language === 'ar-SA'
                                  ? ChevronLeft
                                  : ChevronRight
                              }
                            />
                          </HStack>
                        </Link>
                        {list.length - 1 !== index && (
                          <Divider className='my-1' />
                        )}
                      </React.Fragment>
                    )
                  })}
                </VStack>
              </VStack>
            ))}
          </VStack>

          <LogoutBtn />
        </VStack>
      </ScrollView>
    </VStack>
  )
}
