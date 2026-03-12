import { UserType } from '../types'

export const getUsers = async (): Promise<UserType[]> => {
  const response = await fetch('http://localhost:8000/users/')

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  const data = await response.json()
  return data
}

export const getSampleCode = async (): Promise<string> => {
  const response = await fetch('http://localhost:8000/codes/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: 'Hello'
    })
  })

  if (!response.ok) {
    throw new Error('Failed to generate code')
  }

  const data = await response.json()

  return data.result
}
