import { use$ } from '@legendapp/state/react'
import { Button, ButtonText } from '../ui/button'
import { Toast, ToastDescription, useToast } from '../ui/toast'
import { supabase } from '@/utils/supabase'
import { session$ } from '@/store'

export default function LogoutBtn() {
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
    <Button variant='link' action='negative' onPress={handleLogout}>
      <ButtonText>Log out</ButtonText>
    </Button>
  ) : null
}
