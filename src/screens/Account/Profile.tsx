import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScreenWrapper } from '@/components';

export default function Profile() {
  return (
    <ScreenWrapper headerTitle="Profile" showBackButton scrollable>
      <View style={styles.container}>
        <Text>Profile</Text>
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
