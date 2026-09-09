import AsyncStorage from '@react-native-async-storage/async-storage';

type Entry<T> = { value: T; expires: number };

const memory = new Map<string, Entry<unknown>>();

export async function cacheGet<T>(key: string): Promise<T | null> {
  const hit = memory.get(key);
  if (hit && hit.expires > Date.now()) return hit.value as T;
  try {
    const raw = await AsyncStorage.getItem(`scoreva:cache:${key}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Entry<T>;
    if (parsed.expires < Date.now()) return null;
    memory.set(key, parsed);
    return parsed.value;
  } catch {
    return null;
  }
}

export async function cacheSet<T>(key: string, value: T, ttlMs: number): Promise<void> {
  const entry: Entry<T> = { value, expires: Date.now() + ttlMs };
  memory.set(key, entry);
  try {
    await AsyncStorage.setItem(`scoreva:cache:${key}`, JSON.stringify(entry));
  } catch {
    // cache is best-effort
  }
}
