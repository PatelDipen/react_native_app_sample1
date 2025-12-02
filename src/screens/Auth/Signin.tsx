import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AUTH_NAV_SCREENS } from '@/navigation/NavigationConstants';
import { AuthStackNavigationProps } from '@/navigation/AuthNavigator';

export type SigninProps = AuthStackNavigationProps<AUTH_NAV_SCREENS.SIGNIN>;

export default function Signin({ navigation, route }: SigninProps) {
  const { email } = route.params;

  return (
    <View style={styles.container}>
      <Text>Sign-In</Text>
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
