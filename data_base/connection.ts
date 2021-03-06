import { createPool, Pool } from 'mysql2/promise';

const MYSQL_HOST = process.env.MYSQL_HOST || '';
const MYSQL_DATABASE = process.env.MYSQL_DB_NAME || '';
const MYSQL_USER = process.env.MYSQL_USER || '';
const MYSQL_PASS = process.env.MYSQL_PASSWORD || '';

export async function connect(): Promise<Pool> {
    return createPool( {
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DATABASE,
    } );
}