import AsyncStorage from '@react-native-async-storage/async-storage';

const LOG_KEY = 'APP_LOGS';

export const logEvent = async (event: string) => {
  try {
    const existing = await AsyncStorage.getItem(LOG_KEY);
    const logs = existing ? JSON.parse(existing) : [];
    logs.push({ event, timestamp: Date.now() });
    await AsyncStorage.setItem(LOG_KEY, JSON.stringify(logs));
  } catch (e) {
    console.log('Logging failed', e);
  }
};