export interface ApiSingleResultResponse<T> {
  message: string;
  result: {
    properties: T;
    description: string;
    _id: string;
    uid: string;
    __v: number;
  };
}

export interface ApiPaginatedResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: PaginatedListResult[];
}

interface PaginatedListResult {
  uid: string;
  name: string;
  url: string;
}
