# MovieFavorites

This is a Angular application to view and rate your favorite movies. It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.9, and consumes the Top Rated API from [The Movie Database](https://developers.themoviedb.org/3/movies/get-top-rated-movies).

### Forking & Cloning

Using the application (see directions below for help Forking, Cloning and running the application locally)

## Choosing a Favorite
Click a star next to the movie of your choice to save it as a Favorite. It will then appear in your Favorites/Top Rated table below. Unselecting the star (from either table) will remove the movie from your Favorites/Top Rated Table

## Updating an Average Vote for a movie
Click the pen icon next to the movie's average vote in the All Movies table. An input box will appear for you to enter your new information. If you rate a movie above a 7, it will automatically appear in your Favorites/Top Rated table (whether or not you unfavorite the movie). Movies that are rated below 7, but still favorited wil appear in your Favorites/TopRated table

## Sorting movies
You can view your All Movies table sorted alphabetically by Title or Overview, or numerically by Vote Count, Average Vote or Popularity.

## Removing a movie
If you really, truly hated a movie, click the trashbin icon next to the movie poster, and disappear it from your table and life! (Until you refresh the page).

### Forking & Cloning

1. Fork the main repo to your local GitHub account (use the "Fork" button in the upper right corner).

2. Clone your personal repo to your local computer => `git clone ${url-to-your-repo}`

3. Add the main repo as a known remote repo called "upstream" in your local env => `git remote add upstream ${url-to-main-repo}` from the root folder of the project.

## Development server

Run `npm run start` to run the application locally. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

