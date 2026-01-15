import { useState, useEffect, useCallback } from "react"

export function useChromeStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    if (typeof chrome === "undefined" || !chrome.storage) {
      return
    }

    chrome.storage.local.get([key], (result) => {
      if (result[key] !== undefined) {
        setValue(result[key] as T)
      }
    })

    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === "local" && changes[key] && changes[key].newValue !== undefined) {
        setValue(changes[key].newValue as T)
      }
    }

    chrome.storage.onChanged.addListener(handleStorageChange)

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange)
    }
  }, [key])

  const setStoredValue = useCallback(
    (newValue: T) => {
      setValue(newValue)
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.local.set({ [key]: newValue })
      }
    },
    [key]
  )

  return [value, setStoredValue]
}
