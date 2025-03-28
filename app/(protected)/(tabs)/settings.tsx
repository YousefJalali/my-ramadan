import React from 'react'
import { VStack } from '@/components/ui/vstack'
import {
  Bell,
  BookText,
  CircleUserRound,
  Clock,
  Languages,
  MapPinned,
  SunMoon,
} from 'lucide-react-native'
import { Heading } from '@/components/ui/heading'
import { ScrollView } from '@/components/ui/scroll-view'
import { Divider } from '@/components/ui/divider'
import Profile from '@/components/profile/Profile'
import LogoutBtn from '@/components/profile/LogoutBtn'
import { session$ } from '@/stores/store'
import { use$ } from '@legendapp/state/react'
import { useTranslation } from 'react-i18next'
import SettingsLink, { SettingsLinkType } from '@/components/SettingsLink'

type Section = {
  sectionTitle: string
  list: SettingsLinkType[]
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
        iconName: SunMoon,
        subText: 'appearance',
        path: '/settings/appearance',
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
      {
        iconName: MapPinned,
        subText: 'location',
        path: '/settings/location',
      },
      {
        iconName: Clock,
        subText: 'prayer times',
        path: '/settings/prayer-times',
      },
    ],
  },
  {
    sectionTitle: 'Legal',
    list: [
      {
        iconName: BookText,
        subText: 'terms of service',
        path: 'https://yousefjalali.github.io/my-ramadan/public/terms-of-service.html',
        openInWebBrowser: true,
      },
      {
        iconName: BookText,
        subText: 'privacy policy',
        path: 'https://yousefjalali.github.io/my-ramadan/public/privacy-policy.html',
        openInWebBrowser: true,
      },
    ],
  },
]

export default function Settings() {
  const session = use$(session$)
  const { t } = useTranslation()

  return (
    <VStack className='h-full w-full py-12 bg-background-50'>
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
              className='py-5 px-6 rounded-xl bg-background-100 justify-between items-center w-full'
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
                        <SettingsLink
                          path={path}
                          iconName={iconName}
                          subText={subText}
                        />

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
