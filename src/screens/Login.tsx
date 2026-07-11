import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Eye, EyeOff, Lock, Mail } from 'react-native-feather';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { SocialLoginButton } from '../components/SocialLoginButton';
import { Typography } from '../components/Typography';
import { FullScreenLoader } from '../components/FullScreenLoader';
import { useTheme } from '../services/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onEmailLogin = () => {
    // TODO: replace with real authentication
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Home');
    }, 1000);
  };

  const onGoogleLogin = () => {
    // TODO: wire up Google Sign-In
  };

  const onAppleLogin = () => {
    // TODO: wire up Apple Sign-In
  };

  const canSubmit = email.trim().length > 0 && password.trim().length > 0;

  const passwordToggle = (
    <TouchableOpacity
      onPress={() => setIsPasswordVisible(prev => !prev)}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      {isPasswordVisible ? (
        <EyeOff width={20} height={20} color={colors.muted} />
      ) : (
        <Eye width={20} height={20} color={colors.muted} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.fill}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Typography size={32} weight="800">
              Welcome back
            </Typography>
            <Typography size={16} color={colors.muted}>
              Sign in to continue managing your todos.
            </Typography>
          </View>

          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
              leftIcon={<Mail width={20} height={20} color={colors.muted} />}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
              leftIcon={<Lock width={20} height={20} color={colors.muted} />}
              rightAction={passwordToggle}
            />

            <Pressable style={styles.forgotPassword}>
              <Typography size={14} color={colors.primary} weight="600">
                Forgot password?
              </Typography>
            </Pressable>

            <Button
              title={isLoading ? 'Signing in...' : 'Sign In'}
              onPress={onEmailLogin}
              disabled={!canSubmit || isLoading}
            />
          </View>

          <View style={styles.dividerRow}>
            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />
            <Typography size={14} color={colors.muted}>
              or continue with
            </Typography>
            <View
              style={[styles.divider, { backgroundColor: colors.border }]}
            />
          </View>

          <View style={styles.socialButtons}>
            <SocialLoginButton provider="google" onPress={onGoogleLogin} />
            <SocialLoginButton provider="apple" onPress={onAppleLogin} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <FullScreenLoader visible={isLoading} message="Signing in..." />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 28,
  },
  header: {
    gap: 8,
    marginBottom: 8,
  },
  form: {
    gap: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    opacity: 0.6,
  },
  socialButtons: {
    gap: 16,
  },
});
