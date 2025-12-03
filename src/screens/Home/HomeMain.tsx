import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWrapper } from '@/components';

export default function HomeMain() {
  return (
    <ScreenWrapper headerTitle="Home" scrollable>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Home Screen</Text>
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
  },
});
