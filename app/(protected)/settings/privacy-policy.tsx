import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import React from 'react'
import { useTranslation } from 'react-i18next'

const policy: { [lang: string]: { section: string; content: string }[] } = {
  'en-US': [
    {
      section: 'Introduction',
      content:
        'This Privacy Policy explains how we collect, use, and protect your information when you use the Ramadan Checklist 2025 app.',
    },
    {
      section: 'Information We Collect',
      content:
        'We may collect personal information such as your name, email, and app usage data to enhance your experience.',
    },
    {
      section: 'How We Use Your Information',
      content:
        'We use your data to provide and improve our services, personalize content, and communicate with you.',
    },
    {
      section: 'Sharing and Disclosure',
      content:
        'We do not sell your data. However, we may share it with third-party service providers for functionality and analytics purposes.',
    },
    {
      section: 'Data Security',
      content:
        'We implement security measures to protect your data but cannot guarantee absolute security.',
    },
    {
      section: 'Your Rights',
      content:
        'You may request access, modification, or deletion of your personal data by contacting us.',
    },
    {
      section: 'Changes to This Policy',
      content:
        'We may update this Privacy Policy periodically. Any changes will be posted within the app.',
    },
    {
      section: 'Contact Us',
      content:
        'For any questions or concerns, contact us at [your contact email].',
    },
  ],
  'ar-SA': [
    {
      section: 'المقدمة',
      content:
        'توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحماية معلوماتك عندما تستخدم تطبيق Ramadan Checklist 2025.',
    },
    {
      section: 'المعلومات التي نجمعها',
      content:
        'قد نقوم بجمع معلومات شخصية مثل اسمك وبريدك الإلكتروني وبيانات استخدام التطبيق لتحسين تجربتك.',
    },
    {
      section: 'كيف نستخدم معلوماتك',
      content:
        'نستخدم بياناتك لتقديم وتحسين خدماتنا، وتخصيص المحتوى، والتواصل معك.',
    },
    {
      section: 'المشاركة والإفصاح',
      content:
        'نحن لا نبيع بياناتك. ومع ذلك، قد نشاركها مع مزودي الخدمة من أطراف ثالثة لأغراض الوظائف والتحليلات.',
    },
    {
      section: 'أمان البيانات',
      content:
        'نحن نطبق تدابير أمنية لحماية بياناتك ولكن لا يمكننا ضمان الأمان الكامل.',
    },
    {
      section: 'حقوقك',
      content:
        'يمكنك طلب الوصول إلى بياناتك الشخصية أو تعديلها أو حذفها عن طريق الاتصال بنا.',
    },
    {
      section: 'التعديلات على هذه السياسة',
      content:
        'قد نقوم بتحديث سياسة الخصوصية هذه بشكل دوري. سيتم نشر أي تغييرات داخل التطبيق.',
    },
    {
      section: 'اتصل بنا',
      content:
        'لأي أسئلة أو استفسارات، اتصل بنا عبر البريد الإلكتروني [your contact email].',
    },
  ],
}

export default function PrivacyPolicy() {
  const {
    i18n: { language },
  } = useTranslation()

  return (
    <VStack className='flex-1'>
      {policy[language].map(({ section, content }) => (
        <React.Fragment key={section}>
          <Heading className='mt-6'>{section}</Heading>
          <Text>{content}</Text>
        </React.Fragment>
      ))}
    </VStack>
  )
}
