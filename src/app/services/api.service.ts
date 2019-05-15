import { Injectable } from '@angular/core';
import { Http, } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/';
import { catchError, map } from 'rxjs/operators';

export const
    REQUEST_TYPE_GET = 'GET',
    REQUEST_TYPE_POST = 'POST',
    REQUEST_TYPE_PUT = 'PUT',
    REQUEST_TYPE_DELETE = 'DELETE';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private api_key = '8806289684a57014fc8d7bffd258a3f4';
    // private apiBaseUrl = `https://api.themoviedb.org/3/movie/76341?api_key=${this.api_key}`;
    private apiBaseUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.api_key}&language=en-US&page=1`;

    constructor(
        private _httpClient: HttpClient,
    ) { }

    public callApiService<T>(req: HttpRequest<any>): Observable<T> {
        let response;
        switch (req.method) {
            case REQUEST_TYPE_GET:
                response = this._httpClient.get<T>(`${this.apiBaseUrl}`);
                map(res => {
                    return res;
                }),
                    catchError(err => {
                        return Observable.throw(err);
                    });
                break;
            // case REQUEST_TYPE_POST:
            //   response = this._httpClient.post<T>(`${this.apiBaseUrl}`, req.body);
            //     map(res => {
            //       return res;
            //     }),
            //     catchError(err => {
            //       return Observable.throw(err);
            //     });
            //   break;
            // case REQUEST_TYPE_PUT:
            //   response = this._httpClient.put<T>(`${this.apiBaseUrl}`, req.body);
            //     map(res => {
            //       return res;
            //     }),
            //     catchError(err => {
            //       return Observable.throw(err);
            //     });
            //   break;
            // case REQUEST_TYPE_DELETE:
            //   response = this._httpClient.delete<T>(`${this.apiBaseUrl}`);
            //     map(res => {
            //       return res;
            //     }),
            //     catchError(err => {
            //       return Observable.throw(err);
            //     });
            //   break;
            default:
                throw new Error(`invalid value provided for RequestType => [${req.method}]`);
        }
        return response;
    }


}
