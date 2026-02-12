import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { validateOtp, sendOtp } from '../services/otpManager';

export default function OtpScreen({ route, navigation }: any) {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

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
      {error ? <Text>{error}</Text> : null}
      <Button title="Verify OTP" onPress={handleVerify} />
      <Button title="Resend OTP" onPress={handleResend} />
    </View>
  );
}