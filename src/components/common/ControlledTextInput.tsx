import React from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import TextInputField from '../Text/TextInputField';
import { TextInputProps } from 'react-native';

interface ControlledTextInputProps<T extends FieldValues> extends Omit<
  TextInputProps,
  'value' | 'onChangeText'
> {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T>;
  label?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: object;
  inputStyle?: object;
  isPassword?: boolean;
}

export default function ControlledTextInput<T extends FieldValues>({
  control,
  name,
  rules,
  label,
  helperText,
  required,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  isPassword,
  ...textInputProps
}: ControlledTextInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextInputField
          label={label}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          helperText={helperText}
          required={required}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          onRightIconPress={onRightIconPress}
          containerStyle={containerStyle}
          inputStyle={inputStyle}
          isPassword={isPassword}
          {...textInputProps}
        />
      )}
    />
  );
}
