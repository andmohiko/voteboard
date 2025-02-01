// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher = <T = any>(url: string, idToken: string): Promise<T> => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  }).then((res) => res.json())
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nonAuthFetcher = <T = any>(url: string): Promise<T> => {
  return fetch(url).then((res) => res.json())
}
