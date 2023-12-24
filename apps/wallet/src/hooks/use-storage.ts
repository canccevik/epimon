export function useStorage() {
  async function getItem(key: string) {
    const item = await chrome.storage.local.get(key)
    return item[key]
  }

  async function setItem(key: string, value: string) {
    await chrome.storage.local.set({ [key]: value })
  }

  async function clearItems() {
    await chrome.storage.local.clear()
  }

  return { getItem, setItem, clearItems }
}
