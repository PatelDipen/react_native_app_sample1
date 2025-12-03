import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWrapper } from '@/components';
import { useLogout } from '@/hooks/api/useAuth';

export default function AccountMain() {
  const logoutMutation = useLogout();
  const handleLogout = () => {
    // Implement logout functionality here
    logoutMutation.mutate();
  };

  return (
    <ScreenWrapper headerTitle="Account" scrollable>
      <View style={styles.container}>
        <Text>AccountMain</Text>

        <Button title="Logout" onPress={handleLogout} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
