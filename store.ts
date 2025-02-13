import { observable } from '@legendapp/state'

interface User {
  name: string
  email: string
  avatar: string | undefined
}

// Create a global observable for the Todos
export const user$ = observable<User>({
  name: '',
  email: '',
  avatar: undefined,
})
