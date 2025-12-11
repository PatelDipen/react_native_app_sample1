import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
}

export const CustomText: React.FC<CustomTextProps> = ({ children, style, ...rest }) => {
  return (
    <Text style={[styles.defaultText, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 14,
    color: '#333',
  },
});
