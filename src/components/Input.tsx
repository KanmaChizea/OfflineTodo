import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { useTheme } from '../services/theme';
import { Typography } from './Typography';

export type InputProps = TextInputProps & {
  label?: string;
  leftIcon?: React.ReactNode;
  rightAction?: React.ReactNode;
  error?: string;
};

export const Input = ({
  label,
  leftIcon,
  rightAction,
  error,
  style,
  ...textInputProps
}: InputProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.wrapper}>
      {label ? (
        <Typography size={14} weight="500" color={colors.text}>
          {label}
        </Typography>
      ) : null}
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.danger : colors.border,
            shadowColor: colors.primary,
          },
        ]}
      >
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
        <TextInput
          {...textInputProps}
          placeholderTextColor={colors.muted}
          style={[styles.input, { color: colors.text }, style]}
        />
        {rightAction ? (
          <View style={styles.rightAction}>{rightAction}</View>
        ) : null}
      </View>
      {error ? (
        <Typography size={12} color={colors.danger}>
          {error}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 2,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 16 },
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  leftIcon: {
    marginRight: 12,
  },
  rightAction: {
    marginLeft: 12,
  },
});
