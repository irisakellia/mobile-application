import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search products...',
  value,
  onChangeText,
  onSearch,
  onClear,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: isFocused ? '#2ecc71' : '#e5e7eb',
    ...style,
  };

  const inputStyle: TextStyle = {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
  };

  const iconStyle = {
    color: '#6b7280',
    size: 20,
  };

  const handleSearch = () => {
    if (onSearch && value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleClear = () => {
    onChangeText('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <View style={containerStyle}>
      <Ionicons name="search" {...iconStyle} />
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={{ marginLeft: 8 }}>
          <Ionicons name="close-circle" {...iconStyle} />
        </TouchableOpacity>
      )}
      {onSearch && (
        <TouchableOpacity onPress={handleSearch} style={{ marginLeft: 8 }}>
          <Ionicons name="arrow-forward" {...iconStyle} />
        </TouchableOpacity>
      )}
    </View>
  );
};
