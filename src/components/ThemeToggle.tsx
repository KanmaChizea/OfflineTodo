import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Sun, Moon } from 'react-native-feather';
import { useTheme } from '../services/theme';
import AnalyticsService from '../services/analytics';

export const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useTheme();

  const onPress = () => {
    toggleTheme();
    AnalyticsService.logEvent('theme_toggled', {
      theme: isDark ? 'light' : 'dark',
    });
  };

  return (
    <TouchableOpacity
      onPress={onPress}
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
