import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '../services/theme';
import { Typography } from './Typography';

type Props = {
  visible: boolean;
  message?: string;
};

export const FullScreenLoader = ({ visible, message }: Props) => {
  const { colors } = useTheme();

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? (
        <Typography
          size={14}
          color={colors.muted}
          style={styles.message}
        >
          {message}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  message: {
    marginTop: 16,
  },
});
