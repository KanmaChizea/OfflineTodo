import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Typography } from './Typography';
import { ThemeColors } from '../types/theme';

type Summary = {
  completed: number;
  total: number;
  completionRate: number;
  remaining: number;
};

type Props = {
  summary: Summary;
  colors: ThemeColors;
};

export const HomeListHeader = ({ summary, colors }: Props) => {
  return (
    <View>
      <View
        style={[
          styles.hero,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: colors.primary,
          },
        ]}
      >
        <View
          style={[
            styles.heroBadge,
            {
              backgroundColor: colors.secondary,
            },
          ]}
        >
          <Typography size={12} weight="700" color={colors.surface}>
            Today
          </Typography>
        </View>
        <Typography size={28} weight="700">
          Make today count
        </Typography>
        <Typography
          size={14}
          color={colors.muted}
          style={styles.heroSubtitle}
        >
          {summary.total
            ? `${summary.remaining} task${
                summary.remaining === 1 ? '' : 's'
              } left · ${summary.completionRate}% done`
            : 'Add your first todo to get started'}
        </Typography>
        <View style={styles.progressWrapper}>
          <View
            style={[
              styles.progressTrack,
              { backgroundColor: colors.border },
            ]}
          />
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: colors.primary,
                width: `${summary.total ? summary.completionRate : 0}%`,
              },
            ]}
          />
        </View>
        <View style={styles.heroStatsRow}>
          <View style={styles.heroStat}>
            <Typography size={32} weight="700">
              {summary.remaining}
            </Typography>
            <Typography size={12} color={colors.muted}>
              Remaining
            </Typography>
          </View>
          <View style={styles.heroStat}>
            <Typography size={32} weight="700">
              {summary.completed}
            </Typography>
            <Typography size={12} color={colors.muted}>
              Completed
            </Typography>
          </View>
          <View style={styles.heroStat}>
            <Typography size={32} weight="700">
              {summary.total}
            </Typography>
            <Typography size={12} color={colors.muted}>
              Total
            </Typography>
          </View>
        </View>
      </View>
      <View style={styles.sectionHeader}>
        <Typography size={18} weight="600">
          Your Todos
        </Typography>
        <Typography size={14} color={colors.muted}>
          {summary.total
            ? `${summary.completed} done · ${summary.remaining} left`
            : 'No todos yet'}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hero: {
    borderRadius: 28,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 28,
    marginBottom: 28,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 4,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  heroSubtitle: {
    marginTop: 8,
  },
  progressWrapper: {
    marginTop: 24,
    marginBottom: 20,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    opacity: 0.4,
  },
  progressFill: {
    height: 8,
    borderRadius: 999,
  },
  heroStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heroStat: {
    alignItems: 'flex-start',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 18,
  },
});
