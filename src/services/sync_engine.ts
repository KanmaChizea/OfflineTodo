import { useState } from 'react';
import { SynceQueueItem, Todo } from '../types/todo';
import { useTodo } from './todo';
import { useNetInfo } from '@react-native-community/netinfo';
import {
  createTodoRequest,
  deleteTodoRequest,
  getTodosRequest,
  syncTodosRequest,
  updateTodoRequest,
} from './api';
import { SyncResult } from '../types/api';

export const useTodoSyncEngine = () => {
  const [syncQueue, setSyncQueue] = useState<SynceQueueItem[]>([]);
  const { isInternetReachable } = useNetInfo();
  const {
    addTodoToLocal,
    updateTodoToLocal,
    deleteTodoToLocal,
    initializeTodos,
    updateLocalTodos,
  } = useTodo();

  const sync = () => {
    if (syncQueue.length === 0) return;
    syncTodosRequest({
      changes: syncQueue.map(item => {
        switch (item.action) {
          case 'create':
            return {
              type: 'create',
              data: {
                title: item.data.title,
              },
            };
          case 'update':
            return {
              type: 'update',
              id: item.data.id,
              data: {
                title: item.data.title,
                isCompleted: item.data.isCompleted,
              },
              clientVersion: item.data.version,
            };
          case 'delete':
            return {
              type: 'delete',
              id: item.data.id,
              clientVersion: item.data.version,
            };
        }
      }),
    })
      .then(response => {
        for (let i = 0; i < response.results.length; i++) {
          const item = response.results[i];
          if (item.conflict === true) {
            // TODO: resolve conflict
          } else {
            updateLocalVersion(item);
          }
        }
      })
      .catch(() => {});
  };

  const updateLocalVersion = (item: SyncResult) => {
    if (item.type === 'update' && item.data) {
      updateTodoToLocal(item.data?.id, item.data);
    }
  };

  // 1. save to local storage
  // 2. If online, sync with server, else add to queue
  // 3. If sync fails, add to queue.

  const addTodo = async (title: string) => {
    const todo: Todo = {
      id: Date.now(),
      title,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
      syncStatus: 'pending',
    };
    // 1. Save to local storage
    await addTodoToLocal(todo);

    // 3. If online, sync and update local storage. Else add to queue.
    if (isInternetReachable) {
      createTodoRequest(title)
        .then(result => {
          addTodoToLocal(result.data);
        })
        .catch(() => {
          setSyncQueue(prev => [...prev, { action: 'create', data: todo }]);
        });
    } else {
      setSyncQueue(prev => [...prev, { action: 'create', data: todo }]);
    }
  };

  // 1. save to local storage
  // 2. If online, call endpoint and update local storage version, else add to queue
  // 3. If api request fails, add to queue.
  const updateTodo = async (todo: Todo) => {
    await updateTodoToLocal(todo.id, todo);
    if (isInternetReachable) {
      updateTodoRequest(todo.id, {
        title: todo.title,
        isCompleted: todo.isCompleted,
        version: todo.version,
      })
        .then(res => {
          updateTodoToLocal(todo.id, res.data);
        })
        .catch(() => {
          setSyncQueue(prev => [...prev, { action: 'update', data: todo }]);
        });
    } else {
      setSyncQueue(prev => [...prev, { action: 'update', data: todo }]);
    }
  };

  // 1. save to local storage
  // 2. If online, call endpoint, else add to queue
  // 3. If api request fails, add to queue.
  const deleteTodo = (todo: Todo) => {
    deleteTodoToLocal(todo.id);
    if (isInternetReachable) {
      deleteTodoRequest(todo.id).catch(() => {
        setSyncQueue(prev => [...prev, { action: 'delete', data: todo }]);
      });
    } else {
      setSyncQueue(prev => [...prev, { action: 'delete', data: todo }]);
    }
  };

  // Read-Through Cache
  const onInitializeTodos = () => {
    initializeTodos(); // fetch from local storage
    getTodosRequest().then(response => {
      // fetch from api
      updateLocalTodos(response.data); // update local storage
    });
  };

  return {
    addTodo,
    updateTodo,
    deleteTodo,
    sync,
    onInitializeTodos,
  };
};
