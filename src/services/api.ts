/**
 * API Service for Todo API
 * Handles all HTTP requests to the backend
 * Base URL: http://localhost:3000/api
 */

import {
  GetTodosResponse,
  GetTodoResponse,
  CreateTodoRequest,
  CreateTodoResponse,
  UpdateTodoRequest,
  UpdateTodoResponse,
  DeleteTodoResponse,
  SyncRequest,
  SyncResponse,
  HealthResponse,
  ResetResponse,
  GetTodosParams,
  ConflictResponse,
  ErrorResponse,
} from '../types/api';

const BASE_URL = 'https://todo-backend-five-sable.vercel.app/api';

/**
 * Helper function to handle API responses
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    // Handle specific error statuses
    if (response.status === 409) {
      const errorData = (await response.json()) as ConflictResponse;
      throw new ConflictError(errorData);
    }

    const errorData = (await response.json()) as ErrorResponse;
    throw new ApiError(
      errorData.error || `HTTP error! status: ${response.status}`,
      response.status,
      errorData,
    );
  }

  return (await response.json()) as T;
}

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: ErrorResponse,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Custom error class for conflict errors (409)
 */
export class ConflictError extends Error {
  public clientVersion: number;
  public serverVersion: number;
  public serverData: unknown;
  public conflictType: string;
  public suggestion: string;

  constructor(public data: ConflictResponse) {
    super(data.error);
    this.name = 'ConflictError';
    this.clientVersion = data.clientVersion;
    this.serverVersion = data.serverVersion;
    this.serverData = data.serverData;
    this.conflictType = data.conflictType;
    this.suggestion = data.suggestion;
  }
}

/**
 * Build URL with query parameters
 * Uses simple string concatenation for React Native compatibility
 */
function buildUrl(
  endpoint: string,
  params?: Record<string, string | number | undefined>,
): string {
  let url = `${BASE_URL}${endpoint}`;

  if (params) {
    const queryParams: string[] = [];
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
      }
    });
    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }
  }

  return url;
}

// ==================== Todo Endpoints ====================

/**
 * Get all todos
 * Use the `since` parameter for incremental sync
 */
export async function getTodos(
  params?: GetTodosParams,
): Promise<GetTodosResponse> {
  const url = buildUrl('/todos', params);
  const response = await fetch(url);
  return handleResponse<GetTodosResponse>(response);
}

/**
 * Get a single todo by ID
 */
export async function getTodo(id: number): Promise<GetTodoResponse> {
  const response = await fetch(`${BASE_URL}/todos/${id}`);
  return handleResponse<GetTodoResponse>(response);
}

/**
 * Create a new todo
 */
export async function createTodo(
  data: CreateTodoRequest,
): Promise<CreateTodoResponse> {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<CreateTodoResponse>(response);
}

/**
 * Update a todo
 * Requires version field for optimistic concurrency control
 * May throw ConflictError if server has newer version
 */
export async function updateTodo(
  id: number,
  data: UpdateTodoRequest,
): Promise<UpdateTodoResponse> {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<UpdateTodoResponse>(response);
}

/**
 * Delete a todo
 * Optionally include version for conflict detection
 */
export async function deleteTodo(
  id: number,
  version?: number,
): Promise<DeleteTodoResponse> {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: version !== undefined ? JSON.stringify({ version }) : undefined,
  });
  return handleResponse<DeleteTodoResponse>(response);
}

// ==================== Sync Endpoints ====================

/**
 * Batch sync for offline-first apps
 * Synchronize multiple changes in one request
 */
export async function syncTodos(data: SyncRequest): Promise<SyncResponse> {
  const response = await fetch(`${BASE_URL}/todos/sync`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleResponse<SyncResponse>(response);
}

// ==================== System Endpoints ====================

/**
 * Health check
 * Check if the API is running and get basic stats
 */
export async function healthCheck(): Promise<HealthResponse> {
  const response = await fetch(`${BASE_URL}/health`);
  return handleResponse<HealthResponse>(response);
}

/**
 * Reset all data
 * Delete all todos (useful for testing)
 */
export async function resetData(): Promise<ResetResponse> {
  const response = await fetch(`${BASE_URL}/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse<ResetResponse>(response);
}

// ==================== Export all functions ====================

export const apiService = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  syncTodos,
  healthCheck,
  resetData,
};

export default apiService;
