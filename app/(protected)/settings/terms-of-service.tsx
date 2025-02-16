import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { VStack } from '@/components/ui/vstack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView } from 'react-native'

const terms: { [lang: string]: { section: string; content: string }[] } = {
  'en-US': [
    {
      section: 'Acceptance of Terms',
      content:
        'By accessing or using the App, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the App.',
    },
    {
      section: 'Use of the App',
      content:
        'The App is designed to help users manage their Ramadan activities and checklist. You agree to use the App only for lawful purposes and in accordance with these Terms. You must not misuse the App or attempt to interfere with its functionality.',
    },
    {
      section: 'User Accounts',
      content:
        'Some features of the App may require account creation. You are responsible for maintaining the confidentiality of your login credentials. We reserve the right to suspend or terminate your account if you violate these Terms.',
    },
    {
      section: 'Privacy Policy',
      content:
        'Your use of the App is also governed by our Privacy Policy, which outlines how we collect, use, and protect your information.',
    },
    {
      section: 'Intellectual Property',
      content:
        'All content, trademarks, and intellectual property within the App are owned by us or our licensors. You may not reproduce, modify, or distribute any part of the App without permission.',
    },
    {
      section: 'Disclaimer of Warranties',
      content:
        "The App is provided 'as is' and 'as available' without warranties of any kind. We do not guarantee that the App will be error-free or uninterrupted.",
    },
    {
      section: 'Limitation of Liability',
      content:
        'We shall not be liable for any indirect, incidental, or consequential damages arising from the use of the App.',
    },
    {
      section: 'Modifications to Terms',
      content:
        'We may update these Terms at any time. Changes will be posted in the App, and continued use after changes constitutes acceptance.',
    },
    {
      section: 'Contact Us',
      content:
        'For any questions or concerns regarding these Terms, contact us at [your contact email].',
    },
  ],
  'ar-SA': [
    {
      section: 'قبول الشروط',
      content:
        'من خلال الوصول إلى التطبيق أو استخدامه، فإنك توافق على الالتزام بهذه الشروط. إذا لم توافق على أي جزء من هذه الشروط، يجب عليك عدم استخدام التطبيق.',
    },
    {
      section: 'استخدام التطبيق',
      content:
        'تم تصميم التطبيق لمساعدة المستخدمين في إدارة أنشطتهم وقوائم التحقق الخاصة بشهر رمضان. توافق على استخدام التطبيق فقط للأغراض القانونية ووفقًا لهذه الشروط. يجب عليك عدم إساءة استخدام التطبيق أو محاولة التداخل مع وظيفته.',
    },
    {
      section: 'حسابات المستخدمين',
      content:
        'قد تتطلب بعض ميزات التطبيق إنشاء حساب. أنت مسؤول عن الحفاظ على سرية بيانات تسجيل الدخول الخاصة بك. نحتفظ بالحق في تعليق أو إنهاء حسابك إذا قمت بانتهاك هذه الشروط.',
    },
    {
      section: 'سياسة الخصوصية',
      content:
        'استخدامك للتطبيق يخضع أيضًا لسياسة الخصوصية الخاصة بنا، التي توضح كيفية جمع واستخدام وحماية معلوماتك.',
    },
    {
      section: 'الملكية الفكرية',
      content:
        'جميع المحتويات والعلامات التجارية والملكية الفكرية داخل التطبيق مملوكة لنا أو لموردينا. لا يجوز لك نسخ أو تعديل أو توزيع أي جزء من التطبيق دون إذن.',
    },
    {
      section: 'إخلاء المسؤولية عن الضمانات',
      content:
        "يتم تقديم التطبيق 'كما هو' و 'كما هو متاح' دون أي ضمانات من أي نوع. نحن لا نضمن أن التطبيق سيكون خاليًا من الأخطاء أو غير منقطع.",
    },
    {
      section: 'تحديد المسؤولية',
      content:
        'لن نكون مسؤولين عن أي أضرار غير مباشرة أو عرضية أو تبعية تنشأ عن استخدام التطبيق.',
    },
    {
      section: 'تعديلات على الشروط',
      content:
        'قد نقوم بتحديث هذه الشروط في أي وقت. سيتم نشر التغييرات في التطبيق، ويعتبر استخدامك المستمر بعد التغييرات بمثابة قبول.',
    },
    {
      section: 'اتصل بنا',
      content:
        'لأي أسئلة أو استفسارات بشأن هذه الشروط، يمكنك الاتصال بنا على [بريدك الإلكتروني].',
    },
  ],
}

const intro: { [lang: string]: string } = {
  'en-US':
    'Welcome to Ramadan Checklist 2025. By using the App, you agree to the following Terms of Service. Please read them carefully.',
  'ar-SA':
    'مرحبًا بك في قائمة تحقق رمضان 2025. باستخدام التطبيق، فإنك توافق على شروط الخدمة التالية. يرجى قراءتها بعناية.',
}

export default function TermsOfService() {
  const {
    i18n: { language },
  } = useTranslation()

  return (
    <VStack className='flex-1'>
      <Text>{intro[language]}</Text>
      {terms[language].map(({ section, content }) => (
        <React.Fragment key={section}>
          <Heading className='mt-6'>{section}</Heading>
          <Text>{content}</Text>
        </React.Fragment>
      ))}
    </VStack>
  )
}
