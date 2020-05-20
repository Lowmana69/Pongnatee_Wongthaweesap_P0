/* Import Modules */

import express from 'express';
import request from 'supertest';
import * as moviesService from '../../src/services/movies-service';
import { moviesRouter } from '../../src/routers/movies-router';

/* Setup And Teardown */

beforeAll(() => initDatabase());
afterAll(() => closeDatabase());

const initDatabase = () => console.log('Database Initalized...');
const closeDatabase = () => console.log('Database Closed...');

/* Mock */

jest.mock('../../src/services/movies-service.ts');

const mockMovieService = moviesService as any

/* Setup Express server nad Middleware */

const app = express();
app.use(express.json());
app.use('/movies', moviesRouter);

/* getAllMovies Function */

describe(`'GET' Method /movies`, () => {
    test(`'GET' request should return normally with a 200 Status Code`, async () => {
        mockMovieService.getAllMovies
            .mockImplementation( async () => []);

        await request(app)
            .get('/movies')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'GET' request should 500 Status Code from a Bad Request`, async () => {
        mockMovieService.getAllMovies
            .mockImplementation( async () => {throw new Error()});

        await request(app)
            .get('/movies')
            .expect(500);
    });
});

/* getMovieByID Function */

describe(`'GET' Method /movies/:id`, () => {
    test(`'GET' request should return a JSON File with 200 Status Code`, async () => {
        mockMovieService.getMovieById
            .mockImplementation( async () => ({}));

        await request(app)
            .get('/movies/100')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'GET' request should return a 404 Status Code if JSON File is Not Found`, async () => {
        mockMovieService.getMovieById
            .mockImplementation( async () => (0));

        await request(app)
            .get('/movies/465')
            .expect(404);
    });
    test(`'GET' request should return a 500 Status Code for Internal Server Error`, async () => {
        mockMovieService.getMovieById
            .mockImplementation( async () => {throw new Error()});

        await request(app)
            .get('/movies')
            .expect(500);
    });
});

/* getMovieByGenre Function */

describe(`'GET' Method /movies/genre/:genre`, () => {
    test(`'GET' request should return a JSON File with 200 Status Code`, async () => {
        mockMovieService.getMovieByGenre
            .mockImplementation( async () => ({}));

        await request(app)
            .get('/movies/genre/3')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'GET' request should return a 404 Status Code if JSON File is Not Found`, async () => {
        mockMovieService.getMovieByGenre
            .mockImplementation( async () => (0));

        await request(app)
            .get('/movies/genre/465')
            .expect(404);
    });
    test(`'GET' request should return a 500 Status Code for Internal Server Error`, async () => {
        mockMovieService.getMovieByGenre
            .mockImplementation( async () => {throw new Error()});

        await request(app)
            .get('/movies')
            .expect(500);
    });
});

/* getMovieByFirstLetter Function */

describe(`'GET' Method /movies/title/:title`, () => {
    test(`'GET' request should return a JSON File with 200 Status Code`, async () => {
        mockMovieService.getMovieByFirstLetter
            .mockImplementation( async () => ({}));

        await request(app)
            .get(`/movies/title/'T'`)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'GET' request should return a 404 Status Code if JSON File is Not Found`, async () => {
        mockMovieService.getMovieByFirstLetter
            .mockImplementation( async () => (0));

        await request(app)
            .get(`/movies/title/'Z'`)
            .expect(404);
    });
    test(`'GET' request should return a 500 Status Code for Internal Server Error`, async () => {
        mockMovieService.getMovieByFirstLetter
            .mockImplementation( async () => {throw new Error()});
            
        await request(app)
            .get('/movies')
            .expect(500);
    });
});

/* createNewMovie Function */

describe(`'POST' Method /movies`, () => {
    test(`'POST' should return a 201 Status Code for Successful Creation of a Movie`, async () => {
        mockMovieService.createNewMovie
            .mockImplementation( async () => ({}));
        
        const newMovie = {
            title: 'Godzilla 2000',
            yearrelease: 6,
            genre: 4,
            totalratings: 0,
            isavailable: true,
            currentstatus: 1
        };

        await request(app)
            .post('/movies')
            .send(newMovie)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'POST' should return a 500 Status Code for Error Encounters`, async () => {
        mockMovieService.createNewMovie
            .mockImplementation( async () => {throw new Error()});
        
        const newMovie = {
            title: 'Godzilla 2000',
            yearrelease: 6,
            genre: 'Thriller'
        };

        await request(app)
            .post('/movies')
            .send(newMovie)
            .expect(500);
    });
});

/* patchMovie Function */

describe(`'PATCH' Method /movies`, () => {
    test(`'PATCH' should return a 200 Status Code for Patching Up a Movie`, async () => {
        mockMovieService.patchMovie
            .mockImplementation( async () => ({}));

        const updatedMovie = {
            id: 75,
            title: 'Godzilla',
            yearrelease: 6,
            genre: 4,
            totalratings: 0,
            isavailable: false,
            currentstatus: 2
        };

        await request(app)
            .patch('/movies')
            .send(updatedMovie)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'PATCH' should return a 500 Status Code for Error Encounters`, async () => {
        mockMovieService.patchMovie
            .mockImplementation( async () => {throw new Error()});
        
        const updatedMovie = {
            title: 'Godzilla 2000',
            yearrelease: 6,
            genre: 'Thriller'
        };

        await request(app)
            .patch('/movies')
            .send(updatedMovie)
            .expect(500);
    });
});