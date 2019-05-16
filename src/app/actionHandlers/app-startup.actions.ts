import { Injectable } from '@angular/core';
import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService, REQUEST_TYPE_GET } from '../services/api.service';
import { TopRatedMoviesResponse } from '../models/topRatedMoviesResponse';

@Injectable()
export class AppStartupActions {
    constructor(
        private _apiService: ApiService,
    ) { }

    public getMovieData(pageNumber): Observable<TopRatedMoviesResponse> {
        const req = new HttpRequest(REQUEST_TYPE_GET, `${pageNumber}`);
        return this._apiService.callApiService<TopRatedMoviesResponse>(req);
    }

}
