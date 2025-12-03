import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AUTH_NAV_SCREENS } from '@/navigation/NavigationConstants';
import { AuthStackNavigationProps } from '@/navigation/AuthNavigator';
import { ScreenWrapper } from '@/components';

export type SignupProps = AuthStackNavigationProps<AUTH_NAV_SCREENS.SIGNUP>;

export default function Signup({ navigation, route }: SignupProps) {
  const { email } = route.params;

  return (
    <ScreenWrapper headerTitle="Sign Up" keyboardAvoiding showBackButton>
      <View style={styles.container}>
        <Text>Sign-Up</Text>
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
