import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWrapper } from '@/components';

export default function NewClaim() {
  return (
    <ScreenWrapper headerTitle="New Claim" showBackButton scrollable>
      <View style={styles.container}>
        <Text>NewClaim</Text>
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
