/* Import Modules */

import express from 'express';
import * as recordsService from '../services/records-service';

/* Export Records Routers Functions */

export const recordsRouter = express.Router();

/* Read / Retrieve All Records From The Database */

/*
    http://localhost:3000/people
    Retrieves an array of people from database
*/

recordsRouter.get('', (request, response, next) => {
    recordsService.getAllRecords()
        .then(records => {
            response.set('content-type', 'application/json');
            response.json(records);
            next();
        }).catch(error => {
            response.sendStatus(500);
        });
});

/* Read / Retrieve A Single Record By ID */

/*
    http://localhost:3000/people
    Retrieves an array of people from database
*/

recordsRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    recordsService.getRecordById(id)
        .then(id => {
            if (!id) {
                response.sendStatus(404);
            } else {
                response.json(id)
            }
        }).catch(error => {
            response.sendStatus(500);
            next();
        })
});

/* Read / Retrieve All Records By Category */

/*
    http://localhost:3000/people
    Retrieves an array of people from database
*/

recordsRouter.get('/category/:category', (request, response, next) => {
    const category = +request.params.category;
    recordsService.getRecordsByCategory(category)
        .then(category => {
            if (!category) {
                response.sendStatus(404);
            } else {
                response.json(category);
            }
        }).catch(error => {
            response.sendStatus(500);
            next();
        })
});

/* Read / Retrieve A Record By Number of Ratings */

/*
    http://localhost:3000/people
    Retrieves an array of people from database
*/

recordsRouter.get('/recommendation/:recommendation', (request, response, next) => {
    const recommendation = +request.params.recommendation;
    recordsService.getRecordsByRecommnedation(recommendation)
        .then(recommendation => {
            if (!recommendation) {
                response.sendStatus(404);
            } else {
                response.json(recommendation);
            }
        }).catch(error => {
            response.sendStatus(500);
            next();
        })
});

/* Read / Retrieve All Records By Handler Name */

/*
    http://localhost:3000/people
    Retrieves an array of people from database
*/

recordsRouter.get('/handler/:handler', (request, response, next) => {
    const handler = +request.params.handler;
    recordsService.getRecordsByUser(handler)
        .then(handler => {
            if (!handler) {
                response.sendStatus(404);
            } else {
                response.json(handler);
            }
        }).catch(error => {
            response.sendStatus(500);
            next();
        })
});

/* Create / Post A New Record To The Database */

/*
    POST http://localhost:3000/people
    Creates a new person and saves them to the database.
    Returns the inserted data as JSON with status 201.
*/

recordsRouter.post('', (request, response, next) => {
    const record = request.body;
    recordsService.createNewRecord(record)
        .then(newRecord => {
            response.status(201);
            response.json(newRecord);
            next();
        }).catch(err => {
            console.log(err);
            response.sendStatus(500);
            next();
        });
});

/* Update (Partial) / Patch A Current Record */

recordsRouter.patch('', (request, response, next) => {
    const record = request.body;
    recordsService.patchRecord(record)
        .then(updatedRecord => {
            if (updatedRecord) {
                response.json(updatedRecord);
            } else {
                response.sendStatus(404);
            }
        }).catch(err => {
            response.sendStatus(500);
        }).finally(() => {
            next();
        });
});