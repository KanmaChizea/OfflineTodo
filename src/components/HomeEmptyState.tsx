import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Typography } from './Typography';
import { Button } from './Button';
import { useTheme } from '../services/theme';

type Props = {
  onAddTodoPress: () => void;
};

export const HomeEmptyState = ({ onAddTodoPress }: Props) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.emptyState,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.primary,
        },
      ]}
    >
      <Typography size={18} weight="600">
        All clear
      </Typography>
      <Typography
        size={14}
        color={colors.muted}
        textAlign="center"
        style={styles.emptySubtitle}
      >
        Tap the button below to capture what matters today.
      </Typography>
      <View style={styles.emptyButtonWrapper}>
        <Button title="Add a todo" onPress={onAddTodoPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 40,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 32,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 18 },
    elevation: 3,
  },
  emptySubtitle: {
    marginTop: 12,
  },
  emptyButtonWrapper: {
    marginTop: 28,
    alignSelf: 'stretch',
  },
});
