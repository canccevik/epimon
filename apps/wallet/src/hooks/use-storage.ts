export function useStorage() {
  const getItem = async (key: string) => {
    const item = await chrome.storage.local.get(key)
    return item[key]
  }

  const setItem = async (key: string, value: string) => {
    await chrome.storage.local.set({ [key]: value })
  }

  const clearItems = async () => {
    await chrome.storage.local.clear()
  }

  return { getItem, setItem, clearItems }
}
