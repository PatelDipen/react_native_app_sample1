import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWrapper } from '@/components';

export default function RenewPolicy() {
  return (
    <ScreenWrapper headerTitle="Renew Policy" showBackButton scrollable>
      <View style={styles.container}>
        <Text>RenewPolicy</Text>
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
