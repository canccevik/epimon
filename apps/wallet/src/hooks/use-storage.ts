export function useStorage() {
  async function getItem(key: string) {
    const item = await chrome.storage.local.get(key)
    return item[key]
  }

  async function setItem(key: string, value: string) {
    chrome.storage.local.set({ [key]: value })
  }

  return { getItem, setItem }
}
