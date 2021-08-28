export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface HttpOptions {
  queryParams?: Record<string, string | string[] | undefined>;
  body?: Record<string, unknown> | FormData;
  headers?: Record<string, unknown>;
}
