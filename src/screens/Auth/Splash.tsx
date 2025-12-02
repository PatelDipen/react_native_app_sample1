import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AUTH_NAV_SCREENS } from '@/navigation/NavigationConstants';
import { AuthStackNavigationProps } from '@/navigation/AuthNavigator';

export type SplashProps = AuthStackNavigationProps<AUTH_NAV_SCREENS.SPLASH>;

export default function Splash({ navigation, route }: SplashProps) {
  return (
    <View style={styles.container}>
      <Text>Splash </Text>
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
