import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWrapper } from '@/components';

export default function InsuranceMain() {
  return (
    <ScreenWrapper headerTitle="Insurance" scrollable>
      <View style={styles.container}>
        <Text>InsuranceMain</Text>
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
