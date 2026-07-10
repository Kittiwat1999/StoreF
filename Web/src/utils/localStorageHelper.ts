export function loadFromLocalStorage<T>(key: string): T | null {
  const str = localStorage.getItem(key);
  if (!str) return null;
  try {
    return JSON.parse(str) as T;
  } catch {
    return null;
  }
}

export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    const str = JSON.stringify(value);
    localStorage.setItem(key, str);
  } catch {
    console.error("Failed to save to localStorage");
  }
}
