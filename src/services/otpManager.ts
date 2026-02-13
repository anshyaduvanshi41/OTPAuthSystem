import AsyncStorage from '@react-native-async-storage/async-storage';
import { OtpStorage } from '../types/auth';
import { logEvent } from './analytics';

const OTP_KEY = 'OTP_STORAGE';

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async (email: string) => {
  const existing = await AsyncStorage.getItem(OTP_KEY);
  const data: OtpStorage = existing ? JSON.parse(existing) : {};

  const otp = generateOtp();

  data[email] = {
    otp,
    expiry: Date.now() + 60000,
    attempts: 0,
  };

  await AsyncStorage.setItem(OTP_KEY, JSON.stringify(data));
  await logEvent('OTP_GENERATED');
  return otp;
};

export const validateOtp = async (
  email: string,
  inputOtp: string
): Promise<{ success: boolean; message: string }> => {
  const existing = await AsyncStorage.getItem(OTP_KEY);
  if (!existing) return { success: false, message: 'No OTP found' };

  const data: OtpStorage = JSON.parse(existing);
  const entry = data[email];

  if (!entry) return { success: false, message: 'No OTP found' };

  if (Date.now() > entry.expiry) {
    delete data[email];
    await AsyncStorage.setItem(OTP_KEY, JSON.stringify(data));
    await logEvent('OTP_FAILED_EXPIRED');
    return { success: false, message: 'OTP expired' };
  }


  if (entry.attempts >= 3) {
    await logEvent('OTP_FAILED_ATTEMPTS');
    return { success: false, message: 'Max attempts exceeded' };
  }

  if (entry.otp !== inputOtp) {
    entry.attempts += 1;
    data[email] = entry;
    await AsyncStorage.setItem(OTP_KEY, JSON.stringify(data));
    await logEvent('OTP_FAILED_INCORRECT');
    return { success: false, message: 'Incorrect OTP' };
  }

  await logEvent('OTP_SUCCESS');
  delete data[email];
  await AsyncStorage.setItem(OTP_KEY, JSON.stringify(data));
  return { success: true, message: 'Login successful' };
};