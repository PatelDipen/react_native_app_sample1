import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AUTH_NAV_SCREENS } from '@/navigation/NavigationConstants';
import { AuthStackNavigationProps } from '@/navigation/AuthNavigator';

export type SignupProps = AuthStackNavigationProps<AUTH_NAV_SCREENS.SIGNUP>;

export default function Signup({ navigation, route }: SignupProps) {
  const { email } = route.params;

  return (
    <View style={styles.container}>
      <Text>Sign-Up</Text>
      {email && <Text>Email: {email}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
