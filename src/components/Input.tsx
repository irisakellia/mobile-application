import React, { useState } from 'react';
import { View, TextInput, Text, ViewStyle, TextStyle } from 'react-native';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  style,
  inputStyle,
  labelStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = (): ViewStyle => ({
    marginBottom: 16,
    ...style,
  });

  const getLabelStyle = (): TextStyle => ({
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
    ...labelStyle,
  });

  const getInputStyle = (): TextStyle => ({
    borderWidth: 1,
    borderColor: error ? '#ef4444' : isFocused ? '#2ecc71' : '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: disabled ? '#9ca3af' : '#111827',
    backgroundColor: disabled ? '#f9fafb' : '#ffffff',
    minHeight: multiline ? 80 : 48,
    textAlignVertical: multiline ? 'top' : 'center',
    ...inputStyle,
  });

  const getErrorStyle = (): TextStyle => ({
    fontSize: 14,
    color: '#ef4444',
    marginTop: 4,
  });

  return (
    <View style={getContainerStyle()}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}
      <TextInput
        style={getInputStyle()}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={!disabled}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {error && <Text style={getErrorStyle()}>{error}</Text>}
    </View>
  );
};
