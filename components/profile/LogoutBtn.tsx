import { use$ } from '@legendapp/state/react'
import { Button, ButtonText } from '../ui/button'
import { user$ } from '@/store'
import { Toast, ToastDescription, useToast } from '../ui/toast'
import { supabase } from '@/utils/supabase'

export default function LogoutBtn() {
  const toast = useToast()

  let user = use$(user$.email)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.show({
        id: '' + Math.random(),
        placement: 'bottom',
        duration: 3000,
        render: ({ id }) => {
          const uniqueToastId = 'toast-' + id
          return (
            <Toast nativeID={uniqueToastId} action='muted' variant='solid'>
              <ToastDescription>
                Error Signing Out, {error.message}
              </ToastDescription>
            </Toast>
          )
        },
      })
    }
  }

  return user ? (
    <Button variant='link' action='negative' onPress={handleLogout}>
      <ButtonText>Log out</ButtonText>
    </Button>
  ) : null
}
