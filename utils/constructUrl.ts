export function constructUrl(baseUrl: string, params: Record<string, any>) {
  // Filter out undefined values
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== undefined)
  )

  const queryString = new URLSearchParams(filteredParams).toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}
