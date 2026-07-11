import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppScreen } from '../components/AppScreen';
import { Plus } from 'react-native-feather';
import { RoundButton } from '../components/RoundButton';
import { TodoItem } from '../components/TodoItem';
import { useTodo } from '../services/todo';
import { useTheme } from '../services/theme';
import { ThemeToggle } from '../components/ThemeToggle';
import { LogoutButton } from '../components/LogoutButton';
import { HomeListHeader } from '../components/HomeListHeader';
import { HomeEmptyState } from '../components/HomeEmptyState';
import { getCrashlytics, log } from '@react-native-firebase/crashlytics';
import AnalyticsService from '../services/analytics';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { todos } = useTodo();
  const { initializeTodos } = useTodo();

  const onAddTodoPress = () => {
    log(getCrashlytics(), 'Add todo');
    AnalyticsService.logEvent('add_todo_pressed');
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

  return (
    <AppScreen
      title="Todos"
      subtitle={
        summary.total
          ? 'Track progress and set a deliberate pace for today.'
          : 'Let’s capture what you want to tackle first.'
      }
      hideBackButton
      actions={[
        <ThemeToggle key="toggle-theme" />,
        <LogoutButton key="logout" />,
      ]}
    >
      <FlatList
        data={todos}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <TodoItem todo={item} />}
        contentContainerStyle={[styles.listContent]}
        ListHeaderComponent={
          <HomeListHeader summary={summary} colors={colors} />
        }
        ListEmptyComponent={<HomeEmptyState onAddTodoPress={onAddTodoPress} />}
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
});
