import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Todo } from '../types/todo';
import { Typography } from './Typography';
import { useNavigation } from '@react-navigation/native';
import { useTodo } from '../services/todo';
import { useTheme } from '../services/theme';
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
  const [confirmingDelete, setConfirmingDelete] = React.useState(false);

  const { deleteTodo, updateTodo } = useTodo();
  const { colors } = useTheme();

  const onEdit = () => {
    navigation.navigate('NewTodo', { todo });
  };

  const onDeletePress = () => {
    setConfirmingDelete(true);
  };

  const onConfirmDelete = () => {
    deleteTodo(todo.id);
    setConfirmingDelete(false);
  };

  const onCancelDelete = () => {
    setConfirmingDelete(false);
  };

  const onToggleComplete = () => {
    updateTodo({
      ...todo,
      completed: !todo.completed,
    });
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            shadowColor: colors.primary,
          },
        ]}
        onPress={() => setShowFull(!showFull)}
        activeOpacity={0.95}
      >
        <View style={styles.row}>
          {todo.completed ? (
            <View style={[styles.statusIcon, { backgroundColor: colors.success }]}>
              <Check width={16} height={16} strokeWidth={3} color={colors.surface} />
            </View>
          ) : (
            <View style={[styles.statusIcon, { borderColor: colors.border }]} />
          )}
          <View style={styles.fill}>
            <Typography
              numberOfLines={showFull ? undefined : 1}
              weight={todo.completed ? '500' : '600'}
              style={todo.completed ? styles.strikeThrough : undefined}
              color={todo.completed ? colors.muted : colors.text}
            >
              {todo.title}
            </Typography>
          </View>
          {showFull ? (
            <ChevronUp color={colors.muted} />
          ) : (
            <ChevronDown color={colors.muted} />
          )}
        </View>
        {showFull && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors.background, borderColor: colors.border },
              ]}
              onPress={onEdit}
            >
              <Edit size={16} color={colors.secondary} />
              <Typography size={13} color={colors.secondary} weight="600">
                Edit
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors.background, borderColor: colors.border },
              ]}
              onPress={onDeletePress}
            >
              <Trash size={16} color={colors.danger} />
              <Typography size={13} color={colors.danger} weight="600">
                Delete
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: colors.background, borderColor: colors.border },
              ]}
              onPress={onToggleComplete}
            >
              <Check size={16} color={colors.success} />
              <Typography size={13} color={colors.success} weight="600">
                {todo.completed ? 'Undo' : 'Complete'}
              </Typography>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent
        visible={confirmingDelete}
        onRequestClose={onCancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                shadowColor: colors.primary,
              },
            ]}
          >
            <Typography size={18} weight="700">
              Delete this todo?
            </Typography>
            <Typography size={14} color={colors.muted} style={styles.modalDescription}>
              This action can’t be undone.
            </Typography>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: colors.background, borderColor: colors.border },
                ]}
                onPress={onCancelDelete}
                activeOpacity={0.85}
              >
                <Typography weight="600" color={colors.text}>
                  Cancel
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {
                    backgroundColor: colors.danger,
                    borderColor: colors.danger,
                    shadowColor: colors.danger,
                  },
                ]}
                onPress={onConfirmDelete}
                activeOpacity={0.85}
              >
                <Typography weight="600" color={colors.surface}>
                  Delete
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
    borderRadius: 20,
    marginBottom: 18,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 2,
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
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
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
    gap: 12,
  },
  statusIcon: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    borderRadius: 24,
    padding: 24,
    borderWidth: StyleSheet.hairlineWidth,
    shadowOpacity: 0.2,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 20 },
    elevation: 6,
  },
  modalDescription: {
    marginTop: 8,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
});
