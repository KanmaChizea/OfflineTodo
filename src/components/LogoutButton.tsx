import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { LogOut } from 'react-native-feather';
import { getCrashlytics, log } from '@react-native-firebase/crashlytics';
import { useTheme } from '../services/theme';
import AnalyticsService from '../services/analytics';

export const LogoutButton = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const onLogoutPress = () => {
    log(getCrashlytics(), 'Logout');
    AnalyticsService.logEvent('logout');
    navigation.navigate('Login');
  };

  return (
    <TouchableOpacity
      onPress={onLogoutPress}
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          borderColor: colors.border,
          backgroundColor: colors.background,
        },
      ]}
    >
      <LogOut strokeWidth={1.5} color={colors.text} />
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
