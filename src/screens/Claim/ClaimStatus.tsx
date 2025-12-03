import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWrapper } from '@/components';

export default function ClaimStatus() {
  return (
    <ScreenWrapper headerTitle="Claim Status" showBackButton scrollable>
      <View style={styles.container}>
        <Text>ClaimStatus</Text>
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
