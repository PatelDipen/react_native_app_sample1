import React, { useEffect } from 'react';
import { AUTH_NAV_SCREENS } from '@/navigation/NavigationConstants';
import { AuthStackNavigationProps } from '@/navigation/AuthNavigator';
import { ScreenWrapper } from '@/components';

export type SplashProps = AuthStackNavigationProps<AUTH_NAV_SCREENS.SPLASH>;

export default function Splash({ navigation, route }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(AUTH_NAV_SCREENS.SIGNIN, { email: undefined });
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ScreenWrapper showHeader={false} loading>
      <></>
    </ScreenWrapper>
  );
}
