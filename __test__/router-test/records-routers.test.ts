/* Import Modules */

import express from 'express';
import request from 'supertest';
import * as recordsService from '../../src/services/records-service';
import { recordsRouter } from '../../src/routers/records-router';

/* Setup And Teardown */

beforeAll(() => initDatabase());
afterAll(() => closeDatabase());

const initDatabase = () => console.log('Database Initalized...');
const closeDatabase = () => console.log('Database Closed...');

/* Mock */

jest.mock('../../src/services/records-service.ts');

const mockRecordService = recordsService as any

/* Setup Express server nad Middleware */

const app = express();
app.use(express.json());
app.use('/records', recordsRouter);

/* getAllRecords Function */

describe(`'GET' Method /records`, () => {
    test(`'GET' request should return normally with a 200 Status Code`, async () => {
        mockRecordService.getAllRecords
            .mockImplementation( async () => []);

        await request(app)
            .get('/records')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'GET' request should 500 Status Code from a Bad Request`, async () => {
        mockRecordService.getAllRecords
            .mockImplementation( async () => {throw new Error()});

        await request(app)
            .get('/records')
            .expect(500);
    });
});

/* getRecordByID Function */

describe(`'GET' Method /records/:id`, () => {
    test(`'GET' request should return a JSON File with 200 Status Code`, async () => {
        mockRecordService.getRecordById
            .mockImplementation( async () => ({}));

        await request(app)
            .get('/records/125')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'GET' request should return a 404 Status Code if JSON File is Not Found`, async () => {
        mockRecordService.getRecordById
            .mockImplementation( async () => (0));

        await request(app)
            .get('/records/465')
            .expect(404);
    });
    test(`'GET' request should return a 500 Status Code for Internal Server Error`, async () => {
        mockRecordService.getRecordById
            .mockImplementation( async () => {throw new Error()});

        await request(app)
            .get('/records/')
            .expect(500);
    });
});

/* getRecordsByCategory Function */

describe(`'GET' Method /records/category/:category`, () => {
    test(`'GET' request should return a JSON File with 200 Status Code`, async () => {
        mockRecordService.getRecordsByCategory
            .mockImplementation( async () => ({}));

        await request(app)
            .get('/records/category/1')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'GET' request should return a 404 Status Code if JSON File is Not Found`, async () => {
        mockRecordService.getRecordsByCategory
            .mockImplementation( async () => (0));

        await request(app)
            .get('/records//category/465')
            .expect(404);
    });
    test(`'GET' request should return a 500 Status Code for Internal Server Error`, async () => {
        mockRecordService.getRecordsByCategory
            .mockImplementation( async () => {throw new Error()});

        await request(app)
            .get('/records/category/')
            .expect(500);
    });
});

/* getRecordsByNumbers */

describe(`'GET' Method /records/recommendation/:recommendation`, () => {
    test(`'GET' request should return a JSON File with 200 Status Code`, async () => {
        
        mockRecordService.getRecordsByRecommnedation
            .mockImplementation( async () => ({}));

        await request(app)
            .get('/records/recommendation/110')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'GET' request should return a 404 Status Code if JSON File is Not Found`, async () => {
        mockRecordService.getRecordsByRecommnedation
            .mockImplementation( async () => (0));

        await request(app)
            .get('/records/recommendation/4500')
            .expect(404);
    });
    test(`'GET' request should return a 500 Status Code for Internal Server Error`, async () => {
        mockRecordService.getRecordsByRecommnedation
            .mockImplementation( async () => {throw new Error()});

        await request(app)
            .get('/records/recommendation/')
            .expect(500);
    });
});

/* getRecordByUser Function */

describe(`'GET' Method /records/handler/:handler`, () => {
    test(`'GET' request should return a JSON File with 200 Status Code`, async () => {
        mockRecordService.getRecordsByUser
            .mockImplementation( async () => ({}));

        await request(app)
            .get('/records/handler/50')
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'GET' request should return a 404 Status Code if JSON File is Not Found`, async () => {
        mockRecordService.getRecordsByUser
            .mockImplementation( async () => (0));

        await request(app)
            .get('/records/handler/300')
            .expect(404);
    });
    test(`'GET' request should return a 500 Status Code for Internal Server Error`, async () => {
        mockRecordService.getRecordsByUser
            .mockImplementation( async () => {throw new Error()});

        await request(app)
            .get('/records/handler/')
            .expect(500);
    });
});

/* createNewRecord Function */

describe(`'POST' Method /records`, () => {
    test(`'POST' should return a 201 Status Code for Successful Creation of a Record`, async () => {
        mockRecordService.createNewRecord
            .mockImplementation( async () => ({}));
        
        const newRecord = {
            mediatitle: 'Journey To The West',
            totalratings: 12,
            category: 1,
            recommedation: 3
        };

        await request(app)
            .post('/records')
            .send(newRecord)
            .expect(201)
            .expect('content-type', 'application/json; charset=utf-8');
    });
    test(`'POST' should return a 500 Status Code for Error Encounters`, async () => {
        mockRecordService.createNewRecord
            .mockImplementation( async () => {throw new Error()});
        
        const newRecord = {
            mediatitle: 'Journey To The West',
            totalratings: 12,
            category: 3,
            recommedation: 3
        };

        await request(app)
            .post('/records')
            .send(newRecord)
            .expect(500);
    });
});

/* patchRecord Function */

describe(`'PATCH' Method /records` , () => {
    test(`'PATCH' should return a 200 Status Code for Patching Up a Record`, async () => {
        mockRecordService.patchRecord
            .mockImplementation( async () => ({}));
        
        const updatedRecord = {
            id: 34,
            mediatitle: 'Journey To The West',
            category: 2,
            handler: 44,
            recommendation: 4
        };

        await request(app)
            .patch('/records')
            .send(updatedRecord)
            .expect(200)
            .expect('content-type', 'application/json; charset=utf-8');

    });
    test(`'PATCH' should return a 500 Status Code for Error Encounters`, async () => {
        mockRecordService.patchRecord
            .mockImplementation( async () => {throw new Error()});
        
        const updatedRecord = {
            mediatitle: 'Journey To The West',
            totalRatings: 12,
            category: 3,
            recommedation: 3
        };

        await request(app)
            .patch('/records')
            .send(updatedRecord)
            .expect(500);
    });
});