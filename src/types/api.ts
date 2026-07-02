/**
 * API Types based on Todo API OpenAPI specification
 * Offline-First Architecture Demo
 */

import { SyncAction, Todo } from './todo';

// ==================== Request Types ====================

export interface CreateTodoRequest {
  title: string;
}

export interface UpdateTodoRequest {
  title?: string;
  isCompleted?: boolean;
  version: number;
}

export interface DeleteTodoRequest {
  version?: number;
}

export interface GetTodosParams {
  since?: number;
  [key: string]: string | number | undefined;
}

export interface SyncChange {
  type: SyncAction;
  id?: number;
  data?: Partial<Pick<Todo, 'title' | 'isCompleted'>>;
  clientVersion?: number;
}

export interface SyncRequest {
  changes: SyncChange[];
}

// ==================== Response Types ====================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface GetTodosResponse {
  success: boolean;
  count: number;
  data: Todo[];
  serverVersion: number;
}

export interface GetTodoResponse {
  success: boolean;
  data: Todo;
}

export interface CreateTodoResponse {
  success: boolean;
  data: Todo;
}

export interface UpdateTodoResponse {
  success: boolean;
  data: Todo;
}

export interface DeleteTodoResponse {
  success: boolean;
  message: string;
  deletedAt: string;
  deletedVersion: number;
}

// Conflict response for 409 errors
export interface ConflictResponse {
  success: false;
  error: string;
  conflictType: 'VERSION_MISMATCH';
  clientVersion: number;
  serverVersion: number;
  serverData: Todo;
  suggestion: string;
}

// Error response
export interface ErrorResponse {
  success: false;
  error: string;
  currentVersion?: number;
}

// Sync result for individual change
export interface SyncResult {
  index: number;
  type: SyncAction;
  success: boolean;
  data?: Todo;
  error?: string;
  conflict?: boolean;
}

export interface SyncResponse {
  success: boolean;
  results: SyncResult[];
  conflicts: number;
  serverChanges: Todo[];
  serverVersion: number;
}

// Health check response
export interface HealthResponse {
  status: string;
  timestamp: string;
  todoCount: number;
  maxVersion: number;
}

// Reset response
export interface ResetResponse {
  success: boolean;
  message: string;
}

// ==================== HTTP Status Types ====================

export type HttpStatusCode =
  | 200 // OK
  | 201 // Created
  | 400 // Bad Request
  | 404 // Not Found
  | 409 // Conflict
  | 500; // Internal Server Error
