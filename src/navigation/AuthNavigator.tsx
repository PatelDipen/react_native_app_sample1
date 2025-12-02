// import React from 'react';
// import { AUTH_NAV_SCREENS } from './NavigationConstants';
// import { RouteProp } from '@react-navigation/native';
// import {
//   createNativeStackNavigator,
//   NativeStackNavigationProp,
// } from '@react-navigation/native-stack';
// import Signin from '@/screens/Auth/Signin';
// import Signup from '@/screens/Auth/Signup';
// import Splash from '@/screens/Auth/Splash';

// export type AuthStackParamList = {
//   [AUTH_NAV_SCREENS.SPLASH]: undefined;
//   [AUTH_NAV_SCREENS.SIGNIN]: {
//     email: string | undefined;
//   };
//   [AUTH_NAV_SCREENS.SIGNUP]: {
//     email: string | undefined;
//   };
// };

// export type AuthStackNavigationProps<T extends keyof AuthStackParamList> = {
//   navigation: NativeStackNavigationProp<AuthStackParamList, T>;
//   route: RouteProp<AuthStackParamList, T>;
// };

// const AuthStack = createNativeStackNavigator<AuthStackParamList>();

// export default function AuthNavigator() {
//   return (
//     <AuthStack.Navigator
//       initialRouteName={AUTH_NAV_SCREENS.SPLASH}
//       screenOptions={{ headerShown: false }}
//     >
//       <AuthStack.Screen name={AUTH_NAV_SCREENS.SPLASH} component={Splash} />
//       <AuthStack.Screen name={AUTH_NAV_SCREENS.SIGNIN} component={Signin} />
//       <AuthStack.Screen name={AUTH_NAV_SCREENS.SIGNUP} component={Signup} />
//     </AuthStack.Navigator>
//   );
// }

import React from 'react';
import { AUTH_NAV_SCREENS } from './NavigationConstants';
import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Signin from '@/screens/Auth/Signin';
import Signup from '@/screens/Auth/Signup';
import Splash from '@/screens/Auth/Splash';

export type AuthStackParamList = {
  [AUTH_NAV_SCREENS.SPLASH]: undefined;
  [AUTH_NAV_SCREENS.SIGNIN]: {
    email: string | undefined;
  };
  [AUTH_NAV_SCREENS.SIGNUP]: {
    email: string | undefined;
  };
};

export type AuthStackNavigationProps<T extends keyof AuthStackParamList> = {
  navigation: NativeStackNavigationProp<AuthStackParamList, T>;
  route: RouteProp<AuthStackParamList, T>;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName={AUTH_NAV_SCREENS.SPLASH}
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name={AUTH_NAV_SCREENS.SPLASH} component={Splash} />
      <AuthStack.Screen name={AUTH_NAV_SCREENS.SIGNIN} component={Signin} />
      <AuthStack.Screen name={AUTH_NAV_SCREENS.SIGNUP} component={Signup} />
    </AuthStack.Navigator>
  );
}
