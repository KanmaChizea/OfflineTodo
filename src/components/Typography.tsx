import {
  ColorValue,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';
import React from 'react';
import { useTheme } from '../services/theme';

export type FontWeight =
  | '100' // Thin
  | '300' // Light
  | '400' // Regular
  | '500' // Medium
  | '600' // SemiBold
  | '700' // Bold
  | '800' // Heavy
  | '900'; // Black

export type TypographyProps = TextProps & {
  size?: number;
  weight?: FontWeight;
  italic?: boolean;
  color?: ColorValue;
  children?: string | Element | Element[] | React.ReactNode | React.ReactNode[];
  style?: StyleProp<TextStyle> | StyleProp<TextStyle>[];
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
};
export const Typography = ({
  children,
  size,
  weight,
  textAlign,
  color,
  style,
}: TypographyProps) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        {
          fontSize: size,
          fontWeight: weight,
          textAlign,
          color: color || colors.text,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
