/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Enable mock API in development (comment out to use real API)
if (__DEV__) {
  require('./src/mocks');
  console.log('🎭 Mock API enabled');
}

AppRegistry.registerComponent(appName, () => App);
