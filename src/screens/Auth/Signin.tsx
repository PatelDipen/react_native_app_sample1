import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AUTH_NAV_SCREENS } from '@/navigation/NavigationConstants';
import { AuthStackNavigationProps } from '@/navigation/AuthNavigator';
import { ScreenWrapper } from '@/components';

export type SigninProps = AuthStackNavigationProps<AUTH_NAV_SCREENS.SIGNIN>;

export default function Signin({ navigation, route }: SigninProps) {
  const { email } = route.params;

  return (
    <ScreenWrapper headerTitle="Sign In" keyboardAvoiding>
      <View style={styles.container}>
        <Text>Sign-In</Text>
        {email && <Text>Email: {email}</Text>}
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
