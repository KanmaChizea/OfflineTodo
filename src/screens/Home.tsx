import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppScreen } from '../components/AppScreen';
import { Plus, Sun, Moon } from 'react-native-feather';
import { RoundButton } from '../components/RoundButton';
import { TodoItem } from '../components/TodoItem';
import { useTodo } from '../services/todo';
import { useTheme } from '../services/theme';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import AnalyticsService from '../services/analytics';
import { getCrashlytics, log } from '@react-native-firebase/crashlytics';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { isDark, toggleTheme, colors } = useTheme();
  const { todos } = useTodo();
  const { initializeTodos } = useTodo();

  const getUser = async () => {
    return {
      id: '1',
      name: 'John Doe',
      email: 'hMlWU@example.com',
      country: 'Nigeria',
      subscription: 'Premium',
    };
  };

  const onLogin = async () => {
    const user = await getUser();
    AnalyticsService.setUser(user);
    AnalyticsService.logEvent('transfer_initiated');
  };

  const onAddTodoPress = () => {
    log(getCrashlytics(), 'Add todo');
    navigation.navigate('NewTodo', {});
  };

  useEffect(() => {
    initializeTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const summary = useMemo(() => {
    const completed = todos.filter(todo => todo.isCompleted).length;
    const total = todos.length;
    const completionRate = total ? Math.round((completed / total) * 100) : 0;

    return {
      completed,
      total,
      completionRate,
      remaining: total - completed,
    };
  }, [todos]);

  const themeAction = (
    <TouchableOpacity
      key="toggle-theme"
      onPress={toggleTheme}
      activeOpacity={0.8}
      style={[
        styles.themeToggle,
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

  return (
    <AppScreen
      title="Todos"
      subtitle={
        summary.total
          ? 'Track progress and set a deliberate pace for today.'
          : 'Let’s capture what you want to tackle first.'
      }
      hideBackButton
      actions={[themeAction]}
    >
      <FlatList
        data={todos}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <TodoItem todo={item} />}
        contentContainerStyle={[styles.listContent]}
        ListHeaderComponent={
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
        }
        ListEmptyComponent={
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
        }
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.fab}>
        <RoundButton onPress={onAddTodoPress}>
          <Plus strokeWidth={2} color={colors.surface} />
        </RoundButton>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  listContent: {
    paddingBottom: 140,
  },
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
  themeToggle: {
    padding: 10,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
