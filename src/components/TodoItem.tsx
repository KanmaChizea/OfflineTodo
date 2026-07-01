import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Todo } from '../types/todo';
import { Typography } from './Typography';
import { useNavigation } from '@react-navigation/native';
import { useTodo } from '../services/todo';
import {
  Edit,
  Trash,
  Check,
  ChevronDown,
  ChevronUp,
} from 'react-native-feather';

type Props = {
  todo: Todo;
};
export const TodoItem = ({ todo }: Props) => {
  const navigation = useNavigation();
  const [showFull, setShowFull] = React.useState(false);

  const { deleteTodo, updateTodo } = useTodo();

  const onEdit = () => {
    navigation.navigate('NewTodo', { todo });
  };

  const onDelete = () => {
    deleteTodo(todo.id);
  };

  const onToggleComplete = () => {
    updateTodo({
      ...todo,
      completed: !todo.completed,
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setShowFull(!showFull)}
    >
      <View style={styles.row}>
        {todo.completed && <Check color="green" />}
        <View style={styles.fill}>
          <Typography numberOfLines={showFull ? undefined : 1}>
            {todo.title}
          </Typography>
        </View>
        {showFull ? <ChevronUp /> : <ChevronDown />}
      </View>
      {showFull && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onEdit}>
            <Edit size={12} color="red" />
            <Typography size={12} color="red">
              Edit
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onDelete}>
            <Trash size={12} color="red" />
            <Typography size={12} color="red">
              Delete
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onToggleComplete}>
            <Check size={12} color="red" />
            <Typography size={12} color="red">
              Complete
            </Typography>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
  },
  fill: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
