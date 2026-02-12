import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSessionTimer } from '../hooks/useSessionTimer';
import { logEvent } from '../services/analytics';

export default function SessionScreen({ navigation }: any) {
  const duration = useSessionTimer(true);

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  const handleLogout = async () => {
    await logEvent('LOGOUT');
    navigation.replace('Login');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Session Started</Text>
      <Text>
        Duration: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}