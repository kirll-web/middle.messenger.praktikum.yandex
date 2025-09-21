// export enum METHODS {
//     GET = 'GET',
//     POST = 'POST',
//     PUT = 'PUT',
//     DELETE = 'DELETE'
// }

// function queryStringify(data: Record<string, unknown>) {
//     if (typeof data !== 'object') {
//         throw new Error('data must be object');
//     }

//     return (
//         '?' +
//         Object.keys(data)
//             .map((key) => {
//                 const value = data[key];
//                 if (Array.isArray(value)) {
//                     return `${key}=${value.map((el) => el).join(',')}`;
//                 }

//                 return `${key}=${value}`;
//             })
//             .join('&')
//     );
// }

// type Options = {
//     data?: unknown;
//     timeout?: number;
//     headers?: Record<string, string>;
// };

// type RequestOptions = Options & {
//     method: METHODS;
// };

// class HTTPTransport {
//     get = (url: string, options: Options = {}) => {
//         return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
//     };

//     post = (url: string, options: Options = {}) => {
//         return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
//     };

//     put = (url: string, options: Options = {}) => {
//         return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
//     };

//     delete = (url: string, options: Options = {}) => {
//         return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
//     };

//     // PUT, POST, DELETE

//     // options:
//     request = (url: string, options: RequestOptions, timeout = 5000) => {
//         const { method, data, headers } = options;

//         return new Promise((resolve, reject) => {
//             const xhr = new XMLHttpRequest();
//             const newURl =
//                 method === METHODS.GET && data && typeof data === 'object'
//                     ? url + queryStringify(data as Record<string, unknown>)
//                     : url;

//             xhr.open(method, newURl);

//             for (const key in headers) {
//                 xhr.setRequestHeader(key, headers[key]);
//             }

//             xhr.onload = function () {
//                 resolve(xhr);
//             };

//             xhr.onabort = reject;
//             xhr.onerror = reject;
//             xhr.ontimeout = reject;

//             if (method === METHODS.GET || !data) {
//                 xhr.send();
//             } else {
//                 xhr.send(JSON.stringify(data));
//             }

//             setTimeout(() => {
//                 xhr.abort();
//             }, timeout);
//         });
//     };
// }

// type FetchWithRetryOptions = RequestOptions & {
//     tries: number;
// };

// const api = new HTTPTransport();

// export function fetchWithRetry(url: string, options: FetchWithRetryOptions) {
//     const { tries } = options;
//     console.log('tries', tries);
//     if (tries <= 1) {
//         throw new Error('Maximum retries exceeded');
//     }

//     return api
//         .request(url, options)
//         .then((e) => {
//             console.log(e.responseText);
//             return e;
//         })
//         .catch(() => fetchWithRetry(url, { ...options, tries: tries - 1 }));
// }
