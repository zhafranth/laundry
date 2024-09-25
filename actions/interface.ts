export interface Params {
  search?: string;
  page?: number;
  status?: string;
  limit?: number;
  month?: number;
  year?: number;
  startDate?: string;
  endDate?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
