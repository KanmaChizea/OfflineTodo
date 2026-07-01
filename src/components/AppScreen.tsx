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
};
export const AppScreen = ({
  children,
  title,
  actions,
  hideBackButton = false,
}: Props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        {hideBackButton ? null : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft />
          </TouchableOpacity>
        )}
        <Typography style={styles.fill} weight="700" size={20}>
          {title}
        </Typography>
        {actions && <View style={styles.actions}>{actions}</View>}
      </View>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    gap: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  container: {
    paddingHorizontal: 16,
    flex: 1,
    paddingBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});
