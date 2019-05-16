import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AppStartupActions } from '../app/actionHandlers/app-startup.actions';
import { TopRatedMoviesResponse } from '../app/models/topRatedMoviesResponse';
import { Movie } from '../app/models/movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'turner-movie-favorites';
  public moviesAll: Array<Movie> = [];
  public moviesFavorite: Array<Movie> = [];
  public isInputShown: boolean;

  constructor(
    private _appStartupActions: AppStartupActions,
  ) { }

  public ngOnInit() {
    this.getMovies();
    this.isInputShown = false;

  }

  public ngOnDestroy() { }

  private getMovies(): void {
    this._appStartupActions.getMovieData(103)
      .subscribe(
        (response: TopRatedMoviesResponse) => {
          if (response) {
            if (response && response.results && response.results.length) {
              this.moviesAll = response.results;

              if (this.moviesAll && this.moviesAll.length) {
                this.moviesAll.filter(movie => {
                  const minimumFavoriteVoteAverage = 7;
                  if (movie.vote_average > minimumFavoriteVoteAverage) {
                    this.moviesFavorite.push(movie);
                  }
                });
              }
            }
          } else {
            console.log('Response from GET movies call not returned');
          }
        },
        (err: HttpErrorResponse) => {
          console.log('HttpErrorResponse =>', err.error, err.message);
        }
      );
  }

  public favoriteMovie(movie: Movie): void {
    if (!movie) {
      console.log('ERROR: favoriteMovie() - missing movie');
      return;
    }

    movie.favorite = true;

    const movieIndex = this.moviesFavorite.findIndex((mv: Movie) => mv.id === movie.id);
    if (!!movieIndex) {
      this.moviesFavorite.unshift(movie);
      this.sortMovieFavorites();
    }

  }

  public unFavoriteMovie(movie: Movie): void {
    if (!movie) {
      console.log('ERROR: unFavoriteMovie() - missing movie');
      return;
    }

    movie.favorite = false;
    const movieIndex = this.moviesAll.findIndex((mv: Movie) => mv.id === movie.id);
    this.moviesFavorite.splice(movieIndex, 1);
  }

  public unFavoriteTopRatedMovie(movie: Movie): void {
    if (!movie) {
      console.log('ERROR: unFavoriteTopRatedMovie() - missing movie');
      return;
    }

    movie.favorite = false;

    if (movie.vote_average < 7) {
      const movieIndex = this.moviesFavorite.findIndex((mv: Movie) => mv.id === movie.id);
      this.moviesFavorite.splice(movieIndex, 1);
      this.sortMovieFavorites();
    }
  }

  private sortMovieFavorites(): void {
    this.moviesFavorite.sort(function (a, b) {
      const numA = a.vote_average;
      const numB = b.vote_average;

      return (numB - numA);
    });
  }

  public deleteMovie(movieId): void {
    if (!movieId) {
      console.log('ERROR: deleteMovie() - missing movieId');
      return;
    }

    const movieIndex = this.moviesAll.findIndex(movie => movie.id === movieId);
    this.moviesAll.splice(movieIndex, 1);
  }

  public sortColumnAlphabetic(field: string): void {
    if (!field) {
      console.log('ERROR: sortAlphabetic() - missing field');
      return;
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
        console.log('ERROR: sortAlphabetic() - default case');
    }

  }

  public sortColumnNumeric(field: string): void {
    if (!field) {
      console.log('ERROR: sortNumeric() - missing field');
      return;
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
        console.log('ERROR: sortNumeric() - default case');
    }
  }

  public showInputForEditVoteAverage(): void {
    this.isInputShown = true;
  }

  public updateVoteAverage(newVoteAvg, movie: Movie): void {
    if (!newVoteAvg) {
      alert('You forgot to enter a value! Please enter a number');
      return;
    }

    if (!movie) {
      console.log('ERROR: UpdateVoteAverage() - missing movie');
      return;
    }

    const newAverageVoteNum = parseInt(newVoteAvg, 10);
    this.moviesFavorite = this.resetMovieFavoritesByAvgVote(newAverageVoteNum, movie);
    this.moviesFavorite.sort(function (a, b) {
      const numA = a.vote_average;
      const numB = b.vote_average;

      return (numB - numA);
    });

    this.isInputShown = false;
  }

  private resetMovieFavoritesByAvgVote(averageVote, movie: Movie): Array<Movie> {
    if (!averageVote || !movie) {
      console.log('ERROR: resetMovieFavoritesByAvgVote()');
      return;
    }

    if (averageVote < 7) {
      const filteredMovies = this.moviesFavorite.filter((mv: Movie) => mv.id !== movie.id);
      return filteredMovies;
    } else if (averageVote >= 7) {
      this.moviesFavorite.unshift(movie);
      return this.moviesFavorite;
    }
  }

}
