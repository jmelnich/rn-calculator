import { Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import colors from './button.colors';

export default ({onPress, styleContainer, disabled, title}) => {
  const _style = disabled
    ? {
      ...styleContainer,
      backgroundColor: colors.GREY,
    }
    : styleContainer;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={_style}
      activeOpacity={disabled ? 1 : 0.5}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
