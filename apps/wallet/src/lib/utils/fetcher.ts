import { Payload } from '@epimon/common'

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export function fetcher<T = any>(
  method: HttpMethod = HttpMethod.GET,
  headers?: Record<string, string>
) {
  return async (url: RequestInfo | URL, options?: { arg: Record<string, unknown> }) => {
    const response = await fetch(import.meta.env.VITE_API_URL + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(options?.arg)
    })
    const data = await response.json()
    return data as Payload<T>
  }
}
