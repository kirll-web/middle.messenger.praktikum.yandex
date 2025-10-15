export enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

function queryStringify(data: Record<string, unknown>) {
    if (typeof data !== 'object') {
        throw new Error('data must be object');
    }

    return (
        '?' +
        Object.keys(data)
            .map((key) => {
                const value = data[key];
                if (Array.isArray(value)) {
                    return `${key}=${encodeURIComponent(value.map((el) => el).join(','))}`;
                }

                if (typeof value === 'string') {
                    return `${key}=${encodeURIComponent(value)}`;
                }

                return `${key}=${value}`;
            })
            .join('&')
    );
}
export type ResponseType = 'json' | 'text' | 'formData';

type Options = {
    data?: unknown;
    timeout?: number;
    headers?: Record<string, string> & {
        contentType?: ResponseType;
    };
    jsonParse?: boolean;
};

type RequestOptions = Options & {
    method: METHODS;
};

type ApiResponseSuccess<T = unknown> = {
    data: T;
};

type ApiResponseError = {
    error: string;
    code: number;
};

type ApiResponse<T = unknown> = ApiResponseSuccess<T> | ApiResponseError;

const buildApiResponseSuccess = <T = unknown>(response: XMLHttpRequest, jsonParse: boolean): ApiResponse<T> => {
    return {
        data: jsonParse ? JSON.parse(response.response) : response.response
    } as {
        data: T;
    };
};

const buildApiResponseError = (response: XMLHttpRequest) => {
    return {
        error: response.response,
        code: response.status
    };
};

const buildApiResponse = <T = unknown>(response: XMLHttpRequest, jsonParse: boolean = true): ApiResponse<T> => {
    if ([200, 201, 204].includes(response.status)) {
        return buildApiResponseSuccess<T>(response, jsonParse);
    } else {
        return buildApiResponseError(response);
    }
};

export const isApiResponseSuccess = (response: ApiResponse): response is ApiResponseSuccess => {
    return 'data' in response;
};

export const isApiResponseError = (response: ApiResponse): response is ApiResponseError => {
    return 'error' in response && 'code' in response;
};

export class HTTPTransport {
    static get = <T = undefined>(url: string, options: Options = {}) => {
        return this.request<T>(url, { ...options, method: METHODS.GET }, options.timeout);
    };

    static post = <T = undefined>(url: string, options: Options = {}) => {
        return this.request<T>(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    static put = (url: string, options: Options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    static delete = (url: string, options: Options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    // PUT, POST, DELETE

    // options:
    private static request = <T = unknown>(
        url: string,
        options: RequestOptions,
        timeout?: number
    ): Promise<ApiResponse<T>> => {
        const { method, data, headers } = options;
        const headersContentType = options?.headers?.contentType ?? 'json';
        const jsonParse = options?.jsonParse;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const newURl =
                method === METHODS.GET && data && typeof data === 'object'
                    ? url + queryStringify(data as Record<string, unknown>)
                    : url;

            xhr.open(method, newURl);

            for (const key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }

            if (headersContentType === 'json') {
                xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            }


            xhr.onload = function () {
                const response = buildApiResponse<T>(xhr, jsonParse);

                if (isApiResponseError(response)) {
                    reject(response);
                    return;
                }
                resolve(response);
            };
            xhr.onabort = function () {
                reject(buildApiResponse<T>(this, jsonParse));
            };
            xhr.onerror = function () {
                reject(buildApiResponse<T>(this, jsonParse));
            };
            xhr.ontimeout = function () {
                reject(buildApiResponse<T>(this, jsonParse));
            };
            xhr.withCredentials = true;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                const body = headersContentType === 'json' ? JSON.stringify(data) : (data as XMLHttpRequestBodyInit);
                xhr.send(body);
            }
            if (timeout) {
                setTimeout(() => {
                    xhr.abort();
                });
            }
        });
    };
}
