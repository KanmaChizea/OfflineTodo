import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Sun, Moon } from 'react-native-feather';
import { useTheme } from '../services/theme';

export const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          borderColor: colors.border,
          backgroundColor: colors.background,
        },
      ]}
    >
      {isDark ? (
        <Sun strokeWidth={1.5} color={colors.text} />
      ) : (
        <Moon strokeWidth={1.5} color={colors.text} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
