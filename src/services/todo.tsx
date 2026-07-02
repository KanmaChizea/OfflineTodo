import { createContext, useCallback, useContext, useState } from 'react';
import { Todo } from '../types/todo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage_keys';

interface TodoContextType {
  todos: Todo[];
  initializeTodos: () => void;
  addTodoToLocal: (todo: Todo) => Promise<void>;
  updateTodoToLocal: (id: number, todo: Todo) => Promise<void>;
  deleteTodoToLocal: (id: number) => Promise<void>;
  updateLocalTodos: (todos: Todo[]) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>();

  // Fetch todos from storage
  const initializeTodos = useCallback(async () => {
    if (todos !== undefined) return;
    const result = await AsyncStorage.getItem(STORAGE_KEYS.todo);

    if (result) {
      setTodos(JSON.parse(result));
    }
  }, [todos]);

  const updateLocalTodos = useCallback(async (items: Todo[]) => {
    await AsyncStorage.setItem(STORAGE_KEYS.todo, JSON.stringify(items));
    setTodos(items);
  }, []);

  const addTodoToLocal = useCallback(
    async (todo: Todo) => {
      const newTodos = [...(todos ?? []), todo];
      setTodos(newTodos);
      await AsyncStorage.setItem(STORAGE_KEYS.todo, JSON.stringify(newTodos));
    },
    [todos],
  );

  const updateTodoToLocal = useCallback(
    async (id: number, todo: Todo) => {
      const newTodos = (todos ?? []).map(t => (t.id === id ? todo : t));
      setTodos(newTodos);
      await AsyncStorage.setItem(STORAGE_KEYS.todo, JSON.stringify(newTodos));
    },
    [todos],
  );

  const deleteTodoToLocal = useCallback(
    async (id: number) => {
      setTodos((todos ?? []).filter(t => t.id !== id));
      await AsyncStorage.setItem(STORAGE_KEYS.todo, JSON.stringify(todos));
    },
    [todos],
  );

  return (
    <TodoContext.Provider
      value={{
        todos: todos || [],
        initializeTodos,
        addTodoToLocal,
        updateTodoToLocal,
        deleteTodoToLocal,
        updateLocalTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
