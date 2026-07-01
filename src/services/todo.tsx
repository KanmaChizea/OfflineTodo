import { createContext, useContext, useState } from 'react';
import { Todo } from '../types/todo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage_keys';

interface TodoContextType {
  todos: Todo[];
  initializeTodos: () => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch todos from storage
  const initializeTodos = async () => {
    const result = await AsyncStorage.getItem(STORAGE_KEYS.todo);
    console.log(result);

    if (result) {
      setTodos(JSON.parse(result));
    }
  };

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
    AsyncStorage.setItem(STORAGE_KEYS.todo, JSON.stringify(todos));
  };

  const updateTodo = (todo: Todo) => {
    setTodos(todos.map(t => (t.id === todo.id ? todo : t)));
    AsyncStorage.setItem(STORAGE_KEYS.todo, JSON.stringify(todos));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
    AsyncStorage.setItem(STORAGE_KEYS.todo, JSON.stringify(todos));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
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
