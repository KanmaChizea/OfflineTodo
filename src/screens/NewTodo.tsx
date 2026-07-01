import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import { Todo } from '../types/todo';
import { AppScreen } from '../components/AppScreen';
import { Button } from '../components/Button';
import { useTodo } from '../services/todo';
import { Typography } from '../components/Typography';

type Props = StaticScreenProps<{
  todo?: Todo;
}>;

export const NewTodoScreen = ({ route }: Props) => {
  const navigation = useNavigation();
  const { todo } = route.params;
  const isEdit = Boolean(todo);
  const { addTodo, updateTodo } = useTodo();
  const [title, setTitle] = React.useState(todo?.title || '');

  const onAdd = () => {
    addTodo({ id: Date.now(), title, completed: false });
    navigation.goBack();
  };

  const onEdit = () => {
    updateTodo({ ...todo!, title });
    navigation.goBack();
  };

  return (
    <AppScreen title={isEdit ? 'Edit Todo' : 'New Todo'}>
      <View style={styles.fill}>
        <Typography>{'Title'}</Typography>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
          style={styles.input}
        />
      </View>
      <Button
        onPress={isEdit ? onEdit : onAdd}
        title={isEdit ? 'Edit' : 'Add'}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    height: 50,
    marginTop: 8,
  },
});
