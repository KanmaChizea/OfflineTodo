import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import { Todo } from '../types/todo';
import { AppScreen } from '../components/AppScreen';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { useTheme } from '../services/theme';
import { useTodoSyncEngine } from '../services/sync_engine';

type Props = StaticScreenProps<{
  todo?: Todo;
}>;

export const NewTodoScreen = ({ route }: Props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { todo } = route.params;
  const isEdit = Boolean(todo);
  const { addTodo, updateTodo } = useTodoSyncEngine();
  const [title, setTitle] = React.useState(todo?.title || '');

  const onAdd = () => {
    addTodo(title);
    navigation.goBack();
  };

  const onEdit = () => {
    updateTodo({ ...todo!, title });
    navigation.goBack();
  };

  return (
    <AppScreen
      title={isEdit ? 'Edit Todo' : 'New Todo'}
      subtitle={
        isEdit
          ? 'Give this todo a sharper direction.'
          : 'Capture the next thing you want to move forward.'
      }
    >
      <View style={styles.fill}>
        <View style={styles.labelWrapper}>
          <Typography size={14} color={colors.muted} weight="500">
            Title
          </Typography>
          <Typography size={12} color={colors.muted}>
            Add a quick summary so Future You knows the plan.
          </Typography>
        </View>
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              shadowColor: colors.primary,
            },
          ]}
        >
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Write the next thing to tackle"
            placeholderTextColor={colors.muted}
            style={[styles.input, { color: colors.text }]}
          />
        </View>
      </View>
      <Button
        onPress={isEdit ? onEdit : onAdd}
        title={isEdit ? 'Save Changes' : 'Add Todo'}
        disabled={!title.trim()}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  labelWrapper: {
    gap: 4,
    marginBottom: 16,
  },
  inputWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 2,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 16 },
    elevation: 3,
  },
  input: {
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '500',
  },
});
