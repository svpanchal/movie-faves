import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppStartupActions } from '../app/actionHandlers/app-startup.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'turner-movie-favorites';

  constructor(
    private _fb: FormBuilder,
    private _appStartupActions: AppStartupActions,
  ) { }

  public ngOnInit() {
    this.getMovies();
  }

  public ngOnDestroy() { }

  private getMovies(): void {
    this._appStartupActions.getMovieData('SAMPLEDATAASDLFJALSDKJF')
      .subscribe(
        (response) => {
          if (response) {
            console.log('SUCCESS =====>', response);
          } else {
            console.log('ERROR GET MOVIES COMPONENT CALL');
          }
        },
        (err: HttpErrorResponse) => {
          console.log('in the httperrorresponse');
        }
      );

  }

}
