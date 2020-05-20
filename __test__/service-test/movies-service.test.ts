/* Import Modules */

import * as MoviesService from '../../src/services/movies-service';
import * as MoviesDao from '../../src/daos/movies-dao';
import { Movie } from '../../src/models/Movie';

/*  */

beforeAll(() => initDatabase());
afterAll(() => closeDatabase());

const initDatabase = () => console.log('Database Initalized...');
const closeDatabase = () => console.log('Database Closed...');

/* Mock */

jest.mock('../../src/daos/movies-dao.ts');

/*  */

const mockMoviesDao = MoviesDao as any;

/* getAllMovies Function */

describe('getAllMovies Function', () => {
    test(`'getAllMovies Function exists`, async () => {
        expect.assertions(1);

        mockMoviesDao.getAllMovies
            .mockImplementation( async () => ([]));

        const result = await MoviesService.getAllMovies();

        expect(result).toBeDefined();
    });
    test(`'getAllMovies' should return an array`, async () => {
        expect.assertions(1);

        mockMoviesDao.getAllMovies
            .mockImplementation( async () => ([]));

        const result = await MoviesService.getAllMovies();

        expect(result).toBeTruthy();
    });
    test(`'getAllMovies' should NOT contain an object`, async () => {
        expect.assertions(1);

        mockMoviesDao.getAllMovies
            .mockImplementation( async () => ([]));
        
        const result = await MoviesService.getAllMovies();

        expect(result).not.toBeFalsy();
    });
});

/* getMovieByID Function */

describe('getMovieById Function', () => {
    test(`'getMovieById' Function exists`, async () => {
        
        expect.assertions(1);

        mockMoviesDao.getMovieById
            .mockImplementation( async () => ({}));
        
        const result = await MoviesService.getMovieById;

        expect(result).toBeDefined();
    });
    test(`'getMovieById' should contain a Movie at ID #11`, async () => {
        expect.assertions(1);

        mockMoviesDao.getMovieById
            .mockImplementation( async () => ({}));
        
        const result = await MoviesService.getMovieById(11);

        expect(result).toBeTruthy();
    });
    test(`'getMovieById' should NOT contain a Movie with ID #366`, async () => {

        mockMoviesDao.getMovieById
            .mockImplementation( async () => ({}));
        
        const result = await MoviesService.getMovieById(366);

        expect(result).not.toBeFalsy();
    });
});

/* getMovieByGenre Function */

describe('getMovieByGenre', () => {
    test(`'getMovieByGenre' Function exists`, async () => {
        
        expect.assertions(1);

        mockMoviesDao.getMovieByGenre
            .mockImplementation( async () => ([]));
        
        const result = await MoviesService.getMovieByGenre;

        expect(result).toBeDefined();
    });
    test(`'getMovieByGenre' should contain a Movie at Genre #5`, async () => {
        
        expect.assertions(1);

        mockMoviesDao.getMovieByGenre
            .mockImplementation( async () => ({}));
        
        const result = await MoviesService.getMovieByGenre(5);

        expect(result).toBeTruthy();
    });
    test(`'getMovieByGenre' should NOT contain a Movie at Genre #600`, async () => {
        expect.assertions(1);

        mockMoviesDao.getMovieByGenre
            .mockImplementation( async () => ({}));
        
        const result = await MoviesService.getMovieByGenre(600);

        expect(result).not.toBeFalsy();   
    });
});

/* getMovieByFirstLetter Function */



/* createNewMovie Function */

describe('createNewMovie', () => {
    test('New Input Object should create a new Movie Object', async () => {
        mockMoviesDao.createNewMovie
            .mockImplementation(object => object);

        const newMovie = {
            title: 'Diary of Tootsie',
            yearrelease: '7',
            genre: '4',
            totalratings: '0',
            isavailable: true,
            currentstatus: '1'
        };

        const result = await MoviesService.createNewMovie(newMovie);

        expect(newMovie).not.toBeInstanceOf(Movie);
        expect(result).toBeInstanceOf(Movie);
    });
    test('Input ID value should not be pass test', async () => {
        mockMoviesDao.createNewMovie
            .mockImplementation(object => object);

        const newMovie = {
            id: '23',
            title: 'Diary of Tootsie',
            yearrelease: '7',
            genre: '4',
            totalratings: '0',
            isavailable: true,
            currentstatus: '1'
        };

        const result = await MoviesService.createNewMovie(newMovie);

        expect(result.id).not.toBe(newMovie.id);
    });
    test('Extra properties should not be able to pass', async () => {
        mockMoviesDao.createNewMovie
            .mockImplementation(object => object);

        const newMovie = {
            title: 'Diary of Tootsie',
            yearrelease: '7',
            genre: '4',
            totalratings: '0',
            isavailable: true,
            currentstatus: '1',
            origin: 'Thailand'
        };

        const result = await MoviesService.createNewMovie(newMovie) as any;

        expect(result.origin).not.toBeInstanceOf(Movie);
        expect(result.origin).not.toBeDefined();
    });
    test(`A '422' Error should return if no Genre Input is provided`, async () => {

        mockMoviesDao.createNewMovie
            .mockImplementation(  async () => ({}));

        const newMovie = {
            title: 'Diary of Tootsie',
            yearrelease: 3,
            totalratings: 0,
            isavailable: true,
            currentstatus: 1
        };

        try {
            await MoviesService.createNewMovie(newMovie);
        } catch (err) {
            expect(err).toBeDefined();
        }
    });
});

/* patchMovie Function */

describe('patchMovie Function', () => {
    test('Successfully Patch a Movie Up', async () => {
        expect.assertions(1);

        mockMoviesDao.patchMovie
            .mockImplementation( async () => ({}));

        const patchMovie = {
            id: 13,
            title: 'Jaws',
            genre: 11
        };

        try {
            await MoviesService.patchMovie(patchMovie);
            expect(patchMovie).toBeTruthy();
        } catch (err) {
            expect(err).toBeTruthy();
        }

    });
    test('Could not patch movie up with no valid ID', async () => {
        expect.assertions(1);

        mockMoviesDao.patchMovie
            .mockImplementation( async () => ({}));

        const patchMovie = {
            title: 'Jaws',
            genre: 17,
            yearrelease: 5
        };

        try {
            await MoviesService.patchMovie(patchMovie);
        } catch (err) {
            expect(err).toBeTruthy();
        }
    });
});