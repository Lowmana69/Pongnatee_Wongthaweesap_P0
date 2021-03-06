/* Import Modules */

import express from 'express';
import request from 'supertest';
import * as usersService from '../../src/services/users-service';
import { usersRouter } from '../../src/routers/users-router';

/* Setup And Teardown */

beforeAll(() => initDatabase());
afterAll(() => closeDatabase());

const initDatabase = () => console.log('Database Initalized...');
const closeDatabase = () => console.log('Database Closed...');

/* Mock */

jest.mock('../../src/services/users-service.ts');

const mockUserService = usersService as any

/* Setup Express server nad Middleware */

const app = express();
app.use(express.json());
app.use('/users', usersRouter);

/* getAllUsers Function */

describe(`'GET' Method /users`, () => {
    test(`'GET' request should return normally with a 200 Status Code`, async () => {
        mockUserService.getAllUsers
            .mockImplementation( async () => []);

        await request(app)
            .get('/users')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'GET' request should 500 Status Code from a Bad Request`, async () => {
        mockUserService.getAllUsers
            .mockImplementation( async () => {throw new Error()});

        await request(app)
            .get('/users')
            .expect(500);
    });
});

/* getUserByID Function */

describe(`'GET' Method /users/:id`, () => {
    test(`'GET' request should return a JSON File with 200 Status Code`, async () => {
        mockUserService.getUserById
            .mockImplementation( async () => ({}));
        await request(app)
            .get('/users/28')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'GET' request should return a 404 Status Code if JSON File is Not Found`, async () => {
        mockUserService.getUserById
            .mockImplementation( async () => (0));
        await request(app)
            .get('/users/465')
            .expect(404);
    });
    test(`'GET' request should return a 500 Status Code for Internal Server Error`, async () => {
        mockUserService.getUserById
            .mockImplementation( async () => {throw new Error()});
        await request(app)
            .get('/users')
            .expect(500);
    });
});

/* getUserByRatings Function */

describe(`'GET' Method /users/ratings/:totalratings`, () => {
    test(`'GET' request should return a JSON File with 200 Status Code`, async () => {
        mockUserService.getUserByRatings
            .mockImplementation( async () => ({}));

        await request(app)
            .get('/users/ratings/52')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'GET' request should return a 404 Status Code if JSON File is Not Found`, async () => {
        mockUserService.getUserByRatings
            .mockImplementation( async () => (0));

        await request(app)
            .get('/users/ratings/465')
            .expect(404);
    });
    test(`'GET' request should return a 500 Status Code for Internal Server Error`, async () => {
        mockUserService.getUserByRatings
            .mockImplementation( async () => {throw new Error()});

        await request(app)
            .get('/users/ratings')
            .expect(500);
    });
});

/* createNewUser Function */

describe(`'POST' Method /users`, () => {
    test(`'POST' should return a 201 Status Code for Successful Creation of a User`, async () => {
        mockUserService.createNewUser
            .mockImplementation( async () => ({}));
        
        const newUser = {
            fullName: 'Gandalf Stormcrow',
            handler: 'GandalfTheGrey',
            totalRatings: 0
        };

        await request(app)
            .post('/users')
            .send(newUser)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'POST' should return a 500 Status Code for Error Encounters`, async () => {
        mockUserService.createNewUser
            .mockImplementation( async () => {throw new Error()});
        
        const newUser = {
            fullName: 'Gandalf Stormcrow',
            handler: 1
        };

        await request(app)
            .post('/users')
            .send(newUser)
            .expect(500);
    });
});

/* patchUser Function */

describe(`'PATCH' Method /users`, () => {
    test(`'PATCH' should return a 200 Status Code for Sewing Up a User`, async () => {
        mockUserService.patchUser
            .mockImplementation( async () => ({}));

        const updatedUser = {
            id: 50,
            fullName: 'Gandalf Stormcrow',
            handler: 'GandalfTheWhite',
            totalRatings: 52
        };

        await request(app)
            .patch('/users')
            .send(updatedUser)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'PATCH' should return a 500 Status Code for Error Encounters`, async () => {
        mockUserService.patchUser
            .mockImplementation( async () => {throw new Error()});
        
        const updatedUser = {
            fullName: 'Gandalf Stormcrow',
            handler: 1
        };

        await request(app)
            .patch('/users')
            .send(updatedUser)
            .expect(500);
    });
});