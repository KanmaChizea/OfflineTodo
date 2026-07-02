import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Typography } from './Typography';
import { useTheme } from '../services/theme';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};
export const Button = ({ title, onPress, disabled }: Props) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.85}
      style={[
        styles.container,
        {
          backgroundColor: disabled ? colors.muted : colors.primary,
          shadowColor: colors.primary,
        },
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Typography textAlign="center" color={colors.surface} weight="700" size={16}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
});
