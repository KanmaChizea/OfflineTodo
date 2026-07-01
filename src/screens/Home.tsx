import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppScreen } from '../components/AppScreen';
import { Plus, Sun, Moon } from 'react-native-feather';
import { RoundButton } from '../components/RoundButton';
import { TodoItem } from '../components/TodoItem';
import { useTodo } from '../services/todo';
import { useTheme } from '../services/theme';

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { isDark, toggleTheme } = useTheme();
  const { todos, initializeTodos } = useTodo();

  const onAddTodoPress = () => {
    navigation.navigate('NewTodo', {});
  };

  useEffect(() => {
    initializeTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppScreen
      title="Todos"
      hideBackButton
      actions={[
        <TouchableOpacity onPress={toggleTheme}>
          {isDark ? <Sun color="white" /> : <Moon color="black" />}
        </TouchableOpacity>,
      ]}
    >
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item} />}
      />
      <View style={styles.fab}>
        <RoundButton onPress={onAddTodoPress}>
          <Plus color="white" />
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
});
