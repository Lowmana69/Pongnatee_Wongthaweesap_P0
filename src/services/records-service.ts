/* Import Modules */

import { Record } from '../models/Record';
import * as recordsDao from '../daos/records-dao';

 /* Read / Retrieve All Records From The Database */

export function getAllRecords (): Promise<Record[]> {
    return recordsDao.getAllRecords();
}

/* Read / Retrieve A Single Record By ID */

export function getRecordById (id: number): Promise<Record> {
    return recordsDao.getRecordById(id);
}

/* Read / Retrieve All Records By Category */

export function getRecordsByCategory (category: number): Promise<Record[]> {
    return recordsDao.getRecordsByCategory(category);
}

/* Read / Retrieve Records By Total Numbers */

export function getRecordsByRecommnedation (recommendation: number): Promise<Record[]> {
    return recordsDao.getRecordsByRecommnedation(recommendation);
}

/* Read / Retrieve All Records By A Single User */

export function getRecordsByUser (handler: number): Promise<Record> {
    return recordsDao.getRecordsByUser(handler);
}

 /* Create / Post A New Record To The Database */

export function createNewRecord (record: any): Promise<Record> {
    const newRecord = new Record (
        undefined, record.mediatitle,
        record.category, record.handler,
        record.recommendation
    );
    
    const params = (record.mediatitle,
        record.category, record.handler,
        record.recommendation);

console.log(newRecord);
    if (params) {
        return recordsDao.createNewRecord(newRecord);
    } else {
        return new Promise((resolve, reject) => reject(422));
    }
}

/* Update (Partial) / Patch A Current Record From The Database */

export function patchRecord (input: any): Promise<Record> {
    const record = new Record (
        input.id, input.mediatitle,
        input.category, input.handler,
        input.recommendation
    );

    if (!record.id) {
        throw new Error('400');
    }

    return recordsDao.patchRecord(record);
}