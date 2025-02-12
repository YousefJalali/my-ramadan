import { observable } from '@legendapp/state'

interface User {
  name: string
  email: string
}

// Create a global observable for the Todos
export const store$ = observable<User>({
  name: '',
  email: '',
})
