import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '../services/theme';

type Props = {
  children: React.ReactNode;
  onPress: () => void;
};
export const RoundButton = ({ children, onPress }: Props) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.container,
        {
          backgroundColor: colors.primary,
          shadowColor: colors.primary,
        },
      ]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    padding: 18,
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
});
