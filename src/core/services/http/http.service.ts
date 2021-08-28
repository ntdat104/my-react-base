import { Observable, Subject, throwError } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { catchError, finalize, map } from "rxjs/operators";
import StorageService from "../storage";
import { HttpMethod, HttpOptions } from "./http.type";

export class HttpService {
  public isRequesting$ = new Subject<boolean>();
  public onError$ = new Subject<any>();

  private _commonHeader = {
    "Accept": "application/json",
    "Cache-Control": "no-cache no-store",
    "Pragma": "no-cache",
    "Expires": 0,
    "Access-Control-Allow-Origin": "*",
  };

  public get<T>(uri: string, options?: HttpOptions): Observable<T | undefined> {
    return this.request(uri, HttpMethod.GET, options);
  }

  public post<T>(
    uri: string,
    options?: HttpOptions,
  ): Observable<T | undefined> {
    return this.request(uri, HttpMethod.POST, options);
  }

  public put<T>(uri: string, options?: HttpOptions): Observable<T | undefined> {
    return this.request(uri, HttpMethod.PUT, options);
  }

  public delete<T>(
    uri: string,
    options?: HttpOptions,
  ): Observable<T | undefined> {
    return this.request(uri, HttpMethod.DELETE, options);
  }

  public request<T>(
    uri: string,
    method: string,
    options?: HttpOptions,
  ): Observable<T | undefined> {
    let url = this.resolveUri(uri);
    const token = StorageService.get("token");
    if (options && options.queryParams) {
      let queryString = "";
      for (const key in options.queryParams) {
        const value = options.queryParams[key];
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((v) => {
              queryString += `${key}=${v}&`;
            });
          } else {
            queryString += `${key}=${value}&`;
          }
        }
      }
      if (queryString.endsWith("&")) {
        queryString = queryString.substring(0, queryString.length - 1);
      }
      url = url + "?" + queryString;
    }
    this.isRequesting$.next(true);
    return ajax({
      url,
      method,
      ...options,
      headers: {
        ...this._commonHeader,
        Authorization: token ? `Bearer ${token}` : "",
        ...options?.headers,
      },
    }).pipe(
      map((ajaxResponse) => this.handleResponse<T>(ajaxResponse)),
      catchError((error) => {
        this.onError$.next(error);
        return throwError(() => error);
      }),
      finalize(() => {
        this.isRequesting$.next(false);
      }),
    );
  }

  private resolveUri(uri: string): string {
    if (/^(http|https):\/\/.+$/.test(uri)) {
      return uri;
    }
    return `${process.env.REACT_APP_BASE_API_URL}${uri}`;
  }

  public handleResponse<T>(ajaxResponse: AjaxResponse): T | undefined {
    return ajaxResponse.response;
  }
}

export default new HttpService();
