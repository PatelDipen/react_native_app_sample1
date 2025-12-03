import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWrapper } from '@/components';

export default function AccountMain() {
  return (
    <ScreenWrapper headerTitle="Account" scrollable>
      <View style={styles.container}>
        <Text>AccountMain</Text>
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
