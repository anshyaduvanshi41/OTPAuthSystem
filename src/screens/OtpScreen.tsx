import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { validateOtp, sendOtp } from '../services/otpManager';

export default function OtpScreen({ route, navigation }: any) {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
  if (timeLeft <= 0) return;

  const interval = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
  }, [timeLeft]);


  const handleVerify = async () => {
    const result = await validateOtp(email, otp);
    if (result.success) {
      navigation.replace('Session');
    } else {
      setError(result.message);
    }
  };

  const handleResend = async () => {
  await sendOtp(email);
  setError('');
  setTimeLeft(60);   // 👈 ye add karo
  };


  return (
    <View style={{ padding: 20 }}>
      <Text>Enter OTP</Text>
      <TextInput
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        style={{ borderWidth: 1 }}
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <Text style={{ marginTop: 10, color: timeLeft <= 10 ? 'red' : 'black' }}>
        OTP expires in: {timeLeft}s
      </Text>
      <Button
        title="Verify OTP"
        onPress={handleVerify}
        disabled={timeLeft <= 0}
/>

      <Button title="Resend OTP" onPress={handleResend} />
    </View>
  );
}