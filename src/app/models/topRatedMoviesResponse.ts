import { Movie } from './movie';

export class TopRatedMoviesResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: Array<Movie>;
}
