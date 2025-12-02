import React, { memo } from 'react';
import {
  ACCOUNT_STACK_SCREENS,
  BOTTOM_TAB_NAV_SCREENS,
  BUY_STACK_SCREENS,
  CLAIM_STACK_SCREENS,
  HOME_STACK_SCREENS,
  INSURANCE_STACK_SCREENS,
} from './NavigationConstants';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeMain from '@/screens/Home/HomeMain';
import ClaimMain from '@/screens/Claim/ClaimMain';
import NewClaim from '@/screens/Claim/NewClaim';
import ClaimStatus from '@/screens/Claim/ClaimStatus';
import BuyMain from '@/screens/Buy/BuyMain';
import InsuranceMain from '@/screens/Insurance/InsuranceMain';
import PolicyDetails from '@/screens/Insurance/PolicyDetails';
import RenewPolicy from '@/screens/Insurance/RenewPolicy';
import AccountMain from '@/screens/Account/AccountMain';
import Settings from '@/screens/Account/Settings';
import Profile from '@/screens/Account/Profile';

// Home Stack Navigator
export type HomeStackParamList = {
  [HOME_STACK_SCREENS.HOME_MAIN]: undefined;
};

export type HomeStackNavigationProps<T extends keyof HomeStackParamList> = {
  navigation: NativeStackNavigationProp<HomeStackParamList, T>;
  route: RouteProp<HomeStackParamList, T>;
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = memo(() => {
  return (
    <HomeStack.Navigator
      initialRouteName={HOME_STACK_SCREENS.HOME_MAIN}
      screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen
        name={HOME_STACK_SCREENS.HOME_MAIN}
        component={HomeMain}
      />
    </HomeStack.Navigator>
  );
});

// Claim Stack Navigator
export type ClaimStackParamList = {
  [CLAIM_STACK_SCREENS.CLAIM_MAIN]: undefined;
  [CLAIM_STACK_SCREENS.NEW_CLAIM]: undefined;
  [CLAIM_STACK_SCREENS.CLAIM_STATUS]: undefined;
};

export type ClaimStackNavigationProps<T extends keyof ClaimStackParamList> = {
  navigation: NativeStackNavigationProp<ClaimStackParamList, T>;
  route: RouteProp<ClaimStackParamList, T>;
};

const ClaimStack = createNativeStackNavigator<ClaimStackParamList>();

const ClaimStackNavigator = memo(() => {
  return (
    <ClaimStack.Navigator
      initialRouteName={CLAIM_STACK_SCREENS.CLAIM_MAIN}
      screenOptions={{ headerShown: false }}
    >
      <ClaimStack.Screen
        name={CLAIM_STACK_SCREENS.CLAIM_MAIN}
        component={ClaimMain}
      />
      <ClaimStack.Screen
        name={CLAIM_STACK_SCREENS.NEW_CLAIM}
        component={NewClaim}
      />
      <ClaimStack.Screen
        name={CLAIM_STACK_SCREENS.CLAIM_STATUS}
        component={ClaimStatus}
      />
    </ClaimStack.Navigator>
  );
});

// Buy Stack Navigator
export type BuyStackParamList = {
  [BUY_STACK_SCREENS.BUY_MAIN]: undefined;
};

export type BuyStackNavigationProps<T extends keyof BuyStackParamList> = {
  navigation: NativeStackNavigationProp<BuyStackParamList, T>;
  route: RouteProp<BuyStackParamList, T>;
};

const BuyStack = createNativeStackNavigator<BuyStackParamList>();

const BuyStackNavigator = memo(() => {
  return (
    <BuyStack.Navigator
      initialRouteName={BUY_STACK_SCREENS.BUY_MAIN}
      screenOptions={{ headerShown: false }}
    >
      <BuyStack.Screen name={BUY_STACK_SCREENS.BUY_MAIN} component={BuyMain} />
    </BuyStack.Navigator>
  );
});

// Insurance Stack Navigator
export type InsuranceStackParamList = {
  [INSURANCE_STACK_SCREENS.INSURANCE_MAIN]: undefined;
  [INSURANCE_STACK_SCREENS.POLICY_DETAILS]: undefined;
  [INSURANCE_STACK_SCREENS.RENEW_POLICY]: undefined;
};

export type InsuranceStackNavigationProps<
  T extends keyof InsuranceStackParamList,
> = {
  navigation: NativeStackNavigationProp<InsuranceStackParamList, T>;
  route: RouteProp<InsuranceStackParamList, T>;
};

const InsuranceStack = createNativeStackNavigator<InsuranceStackParamList>();

const InsuranceStackNavigator = memo(() => {
  return (
    <InsuranceStack.Navigator
      initialRouteName={INSURANCE_STACK_SCREENS.INSURANCE_MAIN}
      screenOptions={{ headerShown: false }}
    >
      <InsuranceStack.Screen
        name={INSURANCE_STACK_SCREENS.INSURANCE_MAIN}
        component={InsuranceMain}
      />
      <InsuranceStack.Screen
        name={INSURANCE_STACK_SCREENS.POLICY_DETAILS}
        component={PolicyDetails}
      />
      <InsuranceStack.Screen
        name={INSURANCE_STACK_SCREENS.RENEW_POLICY}
        component={RenewPolicy}
      />
    </InsuranceStack.Navigator>
  );
});

// Account Stack Navigator
export type AccountStackParamList = {
  [ACCOUNT_STACK_SCREENS.ACCOUNT_MAIN]: undefined;
  [ACCOUNT_STACK_SCREENS.PROFILE]: undefined;
  [ACCOUNT_STACK_SCREENS.SETTINGS]: undefined;
};

export type AccountStackNavigationProps<T extends keyof AccountStackParamList> =
  {
    navigation: NativeStackNavigationProp<AccountStackParamList, T>;
    route: RouteProp<AccountStackParamList, T>;
  };

const AccountStack = createNativeStackNavigator<AccountStackParamList>();

const AccountStackNavigator = memo(() => {
  return (
    <AccountStack.Navigator
      initialRouteName={ACCOUNT_STACK_SCREENS.ACCOUNT_MAIN}
      screenOptions={{ headerShown: false }}
    >
      <AccountStack.Screen
        name={ACCOUNT_STACK_SCREENS.ACCOUNT_MAIN}
        component={AccountMain}
      />
      <AccountStack.Screen
        name={ACCOUNT_STACK_SCREENS.PROFILE}
        component={Profile}
      />
      <AccountStack.Screen
        name={ACCOUNT_STACK_SCREENS.SETTINGS}
        component={Settings}
      />
    </AccountStack.Navigator>
  );
});

// Bottom Tab Navigator Configuration
export type BottomTabParamList = {
  [BOTTOM_TAB_NAV_SCREENS.HOME]: NavigatorScreenParams<HomeStackParamList>;
  [BOTTOM_TAB_NAV_SCREENS.CLAIM]: NavigatorScreenParams<ClaimStackParamList>;
  [BOTTOM_TAB_NAV_SCREENS.BUY]: NavigatorScreenParams<BuyStackParamList>;
  [BOTTOM_TAB_NAV_SCREENS.INSURANCE]: NavigatorScreenParams<InsuranceStackParamList>;
  [BOTTOM_TAB_NAV_SCREENS.ACCOUNT]: NavigatorScreenParams<AccountStackParamList>;
};

export type BottomTabNavigationProps<T extends keyof BottomTabParamList> = {
  navigation: BottomTabNavigationProp<BottomTabParamList, T>;
  route: RouteProp<BottomTabParamList, T>;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function MainNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName={BOTTOM_TAB_NAV_SCREENS.HOME}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <BottomTab.Screen
        name={BOTTOM_TAB_NAV_SCREENS.HOME}
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_NAV_SCREENS.CLAIM}
        component={ClaimStackNavigator}
        options={{
          tabBarLabel: 'Claim',
          tabBarIcon: ({ color, size }) => (
            <Icon name="document-text-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_NAV_SCREENS.BUY}
        component={BuyStackNavigator}
        options={{
          tabBarLabel: 'Buy',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_NAV_SCREENS.INSURANCE}
        component={InsuranceStackNavigator}
        options={{
          tabBarLabel: 'Insurance',
          tabBarIcon: ({ color, size }) => (
            <Icon name="shield-checkmark-outline" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_NAV_SCREENS.ACCOUNT}
        component={AccountStackNavigator}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
