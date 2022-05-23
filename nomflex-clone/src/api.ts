const API_KEY = "b6aaa7fdbc04684bc4988a14c33fb139";
const BASE_URL = "https://api.themoviedb.org/3";
//https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
export interface IlatestMovie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
}

export interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
  }
  
  export interface IGetMoviesResult {
    dates: {
      maximum: string;
      minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
  }

export function getMovies() {
    return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}
export function getLatestMovies() {
    return fetch(`${BASE_URL}/movie/latest?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}
export function getTopRatedMovies() {
    return fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}
export function upcomingMovies() {
    return fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`).then(
        (response) => response.json()
    );
}
export function getLatestTVShows() {
    return fetch(`${BASE_URL}/tv/latest?api_key=${API_KEY}&language=en-US`).then(
        (response) => response.json()
    );
}
export function getAiringTVShows() {
    return fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}
export function getPopularTVShows() {
    return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`).then(
        (response) => response.json()
    );
}
export function getTopRatedTVShows() {
    return fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`).then(
        (response) => response.json()
    );
}

export function getDetail(keyword: string | null) {
    return fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US`).then(
        (response) => response.json()
    );
}

export function getDetailTvShows(tv_id: number) {
    return fetch(`${BASE_URL}/tv/${tv_id}?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}