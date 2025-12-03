import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWrapper } from '@/components';

export default function PolicyDetails() {
  return (
    <ScreenWrapper headerTitle="Policy Details" showBackButton scrollable>
      <View style={styles.container}>
        <Text>PolicyDetails</Text>
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
