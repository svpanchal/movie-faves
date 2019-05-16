import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { AppStartupActions } from '../app/actionHandlers/app-startup.actions';
import { TopRatedMoviesResponse } from '../app/models/topRatedMoviesResponse';
import { Movie } from '../app/models/movie';
import { d } from '@angular/core/src/render3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'turner-movie-favorites';
  public moviesAll: Array<Movie> = [];
  public moviesFavorite: Array<Movie> = [];

  constructor(
    private _fb: FormBuilder,
    private _appStartupActions: AppStartupActions,
  ) { }

  public ngOnInit() {
    this.getMovies();

  }

  public ngOnDestroy() { }

  private getMovies(): void {
    this._appStartupActions.getMovieData(103)
      .subscribe(
        (response) => {
          if (response) {
            console.log('SUCCESS =====>', response);
            if (response && response.results && response.results.length) {
              this.moviesAll = response.results;
              console.log(this.moviesAll);

              if (this.moviesAll && this.moviesAll.length) {
                this.moviesAll.filter(movie => {
                  const minimumFavoriteVoteAverage = 7;
                  if (movie.vote_average > minimumFavoriteVoteAverage) {
                    this.moviesFavorite.push(movie);
                    console.log('HERE ARE THE FAVORITE MOVIES', this.moviesFavorite);
                  }
                });
              }
            }
          } else {
            console.log('Valid response from GET movies call not returned');
            // TODO show sweetalert here bringing visibility to user
          }
        },
        (err: HttpErrorResponse) => {
          console.log('HttpErrorResponse =>', err.error, err.message);
          // TODO show sweetalert here bringing visibility to user
        }
      );
  }

  public favoriteMovie(movie: Movie): void {
    if (!movie) {
      console.log('Uh oh something went wrong');
    }

    movie.favorite = true;
  }

  public unFavoriteMovie(movie: Movie): void {
    if (!movie) {
      console.log('Error unFavoriteMovie()');
    }

    movie.favorite = false;
  }

  public deleteMovie(movieId): void {
    if (!movieId) {
      console.log('error deleteMovie()');
    }

    const movieToDelete = this.moviesAll.findIndex(movie => movie.id === movieId);
    console.log('the movie you want to delete is', movieToDelete);
    this.moviesAll.splice(movieToDelete, 1);
    console.log(this.moviesAll);
  }

  public sortAlphabetic(field: string): void {
    if (!field) {
      console.log('ERROR IN SORT NUMBERIC METHOD', field);
    }

    switch (field) {
      case 'title':
        this.moviesAll.sort(function (a, b) {
          const textA = a.title.toUpperCase();
          const textB = b.title.toUpperCase();

          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        break;

      case 'overview':
        this.moviesAll.sort(function (a, b) {
          const textA = a.overview.toUpperCase();
          const textB = b.overview.toUpperCase();

          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });

        break;

      default:
        console.log('error');
    }

  }

  public sortNumeric(field: string): void {
    if (!field) {
      console.log('error in sort numeric function', field);
    }

    switch (field) {
      case 'vote_count':
        this.moviesAll.sort(function (a, b) {
          const numA = a.vote_count;
          const numB = b.vote_count;

          return (numA - numB);
        });
        break;

      case 'vote_average':
        this.moviesAll.sort(function (a, b) {
          const numA = a.vote_average;
          const numB = b.vote_average;

          return (numA - numB);
        });
        break;

      case 'popularity':
        this.moviesAll.sort(function (a, b) {
          const numA = a.popularity;
          const numB = b.popularity;

          return (numA - numB);
        });
        break;

      default:
        console.log('we should never get here');
    }
  }
}
