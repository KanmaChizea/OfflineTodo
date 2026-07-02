import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'react-native-feather';
import { Typography } from './Typography';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../services/theme';
type Props = {
  children?: React.ReactNode | React.ReactNode[];
  title: string;
  actions?: React.ReactNode | React.ReactNode[];
  hideBackButton?: boolean;
  subtitle?: string;
};
export const AppScreen = ({
  children,
  title,
  actions,
  hideBackButton = false,
  subtitle,
}: Props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.surface,
            borderBottomColor: colors.border,
            shadowColor: colors.text,
          },
        ]}
      >
        {hideBackButton ? null : (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft color={colors.text} />
          </TouchableOpacity>
        )}
        <Typography style={styles.fill} weight="700" size={20}>
          {title}
        </Typography>
        {actions ? (
          <View style={styles.actions}>{actions}</View>
        ) : (
          <View style={styles.actionsSpacer} />
        )}
      </View>
      {subtitle ? (
        <View style={styles.subtitleWrapper}>
          <Typography size={14} color={colors.muted}>
            {subtitle}
          </Typography>
        </View>
      ) : null}
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  container: {
    paddingHorizontal: 24,
    flex: 1,
    paddingBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionsSpacer: {
    width: 32,
  },
  iconButton: {
    padding: 8,
    borderRadius: 999,
  },
  subtitleWrapper: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
});
