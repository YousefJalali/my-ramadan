import { use$ } from '@legendapp/state/react'
import { Button, ButtonText } from '@/components/ui/button'
import { Toast, ToastDescription, useToast } from '@/components/ui/toast'
import { supabase } from '@/utils/supabase'
import { session$ } from '@/store'
import { useTranslation } from 'react-i18next'

export default function LogoutBtn() {
  const { t } = useTranslation()
  const toast = useToast()

  const session = use$(session$)

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      toast.show({
        id: '' + Math.random(),
        placement: 'bottom',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action='muted' variant='solid'>
              <ToastDescription>Signed Out</ToastDescription>
            </Toast>
          )
        },
      })
    } catch (error) {
      toast.show({
        id: '' + Math.random(),
        placement: 'bottom',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action='muted' variant='solid'>
              <ToastDescription>Error Signing Out</ToastDescription>
            </Toast>
          )
        },
      })
    }
  }

  return session ? (
    <Button
      variant='link'
      action='negative'
      onPress={handleLogout}
      className='w-full'
    >
      <ButtonText>{t('Log out')}</ButtonText>
    </Button>
  ) : null
}
