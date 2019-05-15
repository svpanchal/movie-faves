import { Injectable } from '@angular/core';
import { HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService, REQUEST_TYPE_GET } from '../services/api.service';
import { TopRatedMoviesResponse } from '../models/topRatedMoviesResponse';

// import { CurrenciesResponse } from '../models/currenciesResponse';
// import { CurrencyData } from '../models/currencyData';

@Injectable()
export class AppStartupActions {
    // public currencyArray: Array<CurrencyData> = [];

    constructor(
        private _apiService: ApiService,
    ) { }

    public getMovieData(rates): Observable<TopRatedMoviesResponse> {
        const req = new HttpRequest(REQUEST_TYPE_GET, `${rates}`);
        return this._apiService.callApiService<TopRatedMoviesResponse>(req);

    }

}
