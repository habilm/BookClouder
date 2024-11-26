import getConfig from "./config";

export type fetchOptionsType = {
  method?: "POST" | "GET" | "HEAD" | "OPTIONS" | "DELETE";
  headers?: Headers;
  body?: BodyInit | null;
};

export async function fetchApi(
  url: string,
  options?: fetchOptionsType
): Promise<object> {
  const baseUrl = getConfig("API_URL");

  const fetchOptions = options || {};
  fetchOptions.headers = new Headers(options?.headers);
  fetchOptions.headers.set("content-type", "application/json");
  fetchOptions.method = options?.method || "GET";

  const req = await fetch(baseUrl + url, fetchOptions);
  const body = await req.json();
  if (!req.ok) {
    if (req.status >= 500) {
      throw new Error(`API request failed with status ${req.status}`);
    }
    if (req.status < 500 && req.status >= 400) {
      throw new ValidationError(body);
    }
  }
  return body;
}
type errorResponseType = {
  message: string;
  errors?: Record<string, string>;
  error?: string;
};
export class ValidationError extends Error {
  errors: errorResponseType;
  constructor(errorResponse: errorResponseType) {
    super(errorResponse.message);
    this.name = "ValidationError";
    this.message = errorResponse.message || this.name;
    this.errors = errorResponse;
  }
}

//
