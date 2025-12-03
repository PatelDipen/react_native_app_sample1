import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWrapper } from '@/components';

export default function ClaimMain() {
  return (
    <ScreenWrapper headerTitle="Claims" scrollable>
      <View style={styles.container}>
        <Text>ClaimMain</Text>
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
