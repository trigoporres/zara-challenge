export const BASE_URL = import.meta.env.VITE_API_BASE_URL
export const API_KEY = import.meta.env.VITE_API_KEY

export const apiClient = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...options.headers,
    },
  })

  if (!response.ok) throw new Error('Request failed')
  return response.json()
}
