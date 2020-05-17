/* Import Modules */

import { db } from '../daos/database';
import { Movie, MovieRow } from '../models/Movie';

/**
 * If we are using a one-off query for, we can just use db.query - it will have a connection
 * issue the query without having to pull it from the pool.
 *
 * query(sql, [params, ...]);
 */

// 1. Query database using sql statement
// 2. Query will return a promise typed as QueryResult<PersonRow>
// 3. We can react to the database response by chaining a .then onto the query

/* Read / Retrieve All Movies From The Database */

export function getAllMovies(): Promise<Movie[]> {
    const sql = '';
    return db.query<MovieRow>(sql, [])
        .then(result => {
            const rows: MovieRow[]= result.rows;
            const movie: Movie[] = rows.map(row => Movie.from(row));
            return movie; 
        });
}

/* Read / Retrieve A Single Movie Title By ID */

export function getMovieById(id: number): Promise<Movie> {
    const sql = '';
    return db.query<MovieRow> (sql, [id])
        .then(result => result.rows.map(row => Movie.from(row))[0]);
}

/* Read / Retrieve All Movie Title(s) By Genre */

export function getMovieByGenre(genre: number): Promise<Movie> {
    const sql = '';
    return db.query<MovieRow> (sql, [genre])
        .then(result => result.rows.map(row => Movie.from(row))[0])
}

/* Read / Retrieve A || All Movie Title(s) By First Letter */

export function getMovieByFirstLetter(title: string): Promise<Movie> {
    const sql = '';
    return db.query<MovieRow> (sql, [title])
        .then(result => result.rows.map(row => Movie.from(row))[0])
}

/* Read / Retrieve All Movies By Year Release */

export function getMovieByYear(bydecade: number): Promise<Movie> {
    const sql = '';
    return db.query<MovieRow> (sql, [bydecade])
        .then(result => result.rows.map(row => Movie.from(row))[0])
}

/* Create / Post A New Movie To The Database */

export function createNewMovie(movie: Movie): Promise<Movie> {
    const sql = '';
    const params = [movie.title, movie.genre
        movie.yearRelease, movie.totalRatings,
        movie.currentStatus, movie.isAvailable];
    return db.query<MovieRow> (sql, params)
        .then(result => result.map(row => Movie.from(row))[0]);
}

/* Update (Partial) / Patch A Current Movie */

export function patchMovie(movie: Movie): Promise<Movie> {
    const sql = '';
    const params = [movie.title, movie.genre
        movie.yearRelease, movie.totalRatings,
        movie.currentStatus, movie.isAvailable];
    return db.query<MovieRow> (sql, params)
        .then(result => result.rows.map(row => Movie.from(row))[0]);
}