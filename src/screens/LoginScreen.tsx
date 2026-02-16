import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { sendOtp } from '../services/otpManager';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');

  const handleSendOtp = async () => {
    if (!email.trim()) return;
    const generatedOtp = await sendOtp(email);
    alert(`Your OTP is: ${generatedOtp}`);
    navigation.navigate('Otp', { email });

  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 20 }}
      />
      <Button title="Send OTP" onPress={handleSendOtp} />
    </View>
  );
}