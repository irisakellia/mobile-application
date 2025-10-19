import React from 'react';
import { View, ActivityIndicator, Text, ViewStyle, TextStyle } from 'react-native';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color = '#2ecc71',
  text,
  style,
  textStyle,
}) => {
  const containerStyle: ViewStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    ...style,
  };

  const textStyleDefault: TextStyle = {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    ...textStyle,
  };

  return (
    <View style={containerStyle}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={textStyleDefault}>{text}</Text>}
    </View>
  );
};
