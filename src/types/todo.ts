export type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  syncStatus: SyncStatus;
};

export type SyncStatus = 'pending' | 'synced' | 'syncing';

export type SyncAction = 'create' | 'update' | 'delete';

export type SynceQueueItem = {
  action: SyncAction;
  data: Todo;
};
