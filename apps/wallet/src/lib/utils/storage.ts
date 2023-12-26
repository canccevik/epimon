export const getItem = async (key: string) => {
  const item = await chrome.storage.local.get(key)
  return item[key]
}

export const setItem = async (key: string, value: string) => {
  await chrome.storage.local.set({ [key]: value })
}

export const clearItems = async () => {
  await chrome.storage.local.clear()
}
