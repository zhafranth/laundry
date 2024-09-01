export interface Params {
  search?: string;
  page?: number;
  status?: string;
  limit?: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
