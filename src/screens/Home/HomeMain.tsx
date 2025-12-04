import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWrapper } from '@/components';
import { useCurrentUser } from '@/hooks/api/useAuth';
import { useGlobalLoading } from '@/store/loadingStore';

export default function HomeMain() {
  const { data: user, isLoading, error } = useCurrentUser();
  const isGlobalLoading = useGlobalLoading();

  return (
    <ScreenWrapper headerTitle="Home" scrollable loading={isGlobalLoading}>
      <View style={styles.container}>
        {error ? (
          <Text style={styles.errorText}>Error loading profile</Text>
        ) : user ? (
          <>
            <Text style={styles.welcomeText}>
              Welcome, {user.firstName} {user.lastName}!
            </Text>
            <Text style={styles.text}>Email: {user.email}</Text>
          </>
        ) : (
          <Text style={styles.text}>Welcome to Home Screen</Text>
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginTop: 8,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
