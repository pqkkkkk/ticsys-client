export interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message?: string;
  success: boolean;
  error: ApiError;
}

export interface ApiError {
  statusCode: number;
  message: string;
}

export interface Event {
  eventId: number;
}
