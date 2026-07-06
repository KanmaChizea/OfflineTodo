import { createContext, useContext, useState } from 'react';
import { Todo } from '../types/todo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage_keys';
import { createTodoRequest, getTodosRequest, updateTodoRequest } from './api';
interface TodoContextType {
  todos: Todo[];
  initializeTodos: () => void;
  addTodo: (todo: Todo) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const initializeTodos = async () => {
    try {
      const localTodos = await AsyncStorage.getItem(STORAGE_KEYS.todo);
      if (localTodos) {
        setTodos(JSON.parse(localTodos));
      }
      const apiTodos = await getTodosRequest();
      setTodos(apiTodos.data);
      await AsyncStorage.setItem(
        STORAGE_KEYS.todo,
        JSON.stringify(apiTodos.data),
      );
    } catch {}
  };

  const addTodo = async (todo: Todo) => {
    try {
      const result = await createTodoRequest(todo.title);
      const newTodos = [...todos, result.data];
      setTodos(newTodos);
      AsyncStorage.setItem(STORAGE_KEYS.todo, JSON.stringify(newTodos));
    } catch {}
  };

  const updateTodo = async (todo: Todo) => {
    try {
      const result = await updateTodoRequest(todo.id, todo);
      const newTodos = todos.map(item =>
        item.id === todo.id ? result.data : item,
      );
      setTodos(newTodos);
      AsyncStorage.setItem(STORAGE_KEYS.todo, JSON.stringify(newTodos));
    } catch {}
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      const newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      AsyncStorage.setItem(STORAGE_KEYS.todo, JSON.stringify(newTodos));
    } catch {}
  };

  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        initializeTodos,
        addTodo,
        updateTodo,
        deleteTodo,
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
