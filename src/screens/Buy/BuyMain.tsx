import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWrapper } from '@/components';

export default function BuyMain() {
  return (
    <ScreenWrapper headerTitle="Buy Insurance" scrollable showBackButton>
      <View style={styles.container}>
        <Text>BuyMain</Text>
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
