import { createPool, Pool } from 'mysql2/promise';

const MYSQL_HOST = process.env.MYSQL_HOST || 'database-rimac.c9ahlkel6xmn.us-east-1.rds.amazonaws.com';
const MYSQL_DATABASE = process.env.MYSQL_DB_NAME || 'star_wars';
const MYSQL_USER = process.env.MYSQL_USER || 'admin';
const MYSQL_PASS = process.env.MYSQL_PASSWORD || 'nino3667193';

export async function connect(): Promise<Pool> {
    return createPool( {
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DATABASE,
    } );
}