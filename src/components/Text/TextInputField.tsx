import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  PRIMARY_COLOR,
  ERROR_COLOR,
  Neutrals,
  NUNITO_REGULAR,
  NUNITO_SEMI_BOLD,
} from '@/theme/style';

interface TextInputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: object;
  inputStyle?: object;
  isPassword?: boolean;
}

export default function TextInputField({
  label,
  error,
  helperText,
  required = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  isPassword = false,
  secureTextEntry,
  ...textInputProps
}: TextInputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hasError = !!error;
  const showPasswordToggle = isPassword && !rightIcon;

  const handleRightIconPress = () => {
    if (showPasswordToggle) {
      setShowPassword(!showPassword);
    } else if (onRightIconPress) {
      onRightIconPress();
    }
  };

  const getRightIconName = () => {
    if (showPasswordToggle) {
      return showPassword ? 'eye-off-outline' : 'eye-outline';
    }
    return rightIcon;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          hasError && styles.inputError,
        ]}
      >
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={20}
            color={hasError ? ERROR_COLOR : Neutrals.darkGray}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || showPasswordToggle) && styles.inputWithRightIcon,
            inputStyle,
          ]}
          placeholderTextColor={Neutrals.darkGray}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword ? !showPassword : secureTextEntry}
          {...textInputProps}
        />

        {(rightIcon || showPasswordToggle) && (
          <TouchableOpacity
            onPress={handleRightIconPress}
            style={styles.rightIconContainer}
            disabled={!showPasswordToggle && !onRightIconPress}
          >
            <Icon
              name={getRightIconName() || ''}
              size={20}
              color={hasError ? ERROR_COLOR : Neutrals.darkGray}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: NUNITO_SEMI_BOLD,
    color: PRIMARY_COLOR,
    marginBottom: 8,
  },
  required: {
    color: ERROR_COLOR,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Neutrals.gray,
    borderRadius: 8,
    backgroundColor: Neutrals.white,
    minHeight: 48,
  },
  inputFocused: {
    borderColor: PRIMARY_COLOR,
    borderWidth: 2,
  },
  inputError: {
    borderColor: ERROR_COLOR,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: NUNITO_REGULAR,
    color: PRIMARY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  leftIcon: {
    marginLeft: 12,
  },
  rightIconContainer: {
    padding: 12,
  },
  errorText: {
    fontSize: 12,
    fontFamily: NUNITO_REGULAR,
    color: ERROR_COLOR,
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    fontFamily: NUNITO_REGULAR,
    color: Neutrals.darkGray,
    marginTop: 4,
  },
});
