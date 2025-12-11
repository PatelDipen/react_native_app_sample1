import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PRIMARY_COLOR, NUNITO_BOLD, Neutrals } from '@/theme/style';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
}

export default function Header({
  title,
  showBackButton = false,
  rightComponent,
  onBackPress,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="arrow-back" size={24} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerSection}>{title && <Text style={styles.title}>{title}</Text>}</View>

      <View style={styles.rightSection}>{rightComponent}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: Neutrals.white,
    borderBottomWidth: 1,
    borderBottomColor: Neutrals.gray,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontFamily: NUNITO_BOLD,
    color: PRIMARY_COLOR,
  },
});
