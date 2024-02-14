import process from "process";
import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';

// Function to parse the DATABASE_URL
const parseDatabaseUrl = (url) => {
    // Regex search pattern
    const pattern = /^mysql:\/\/([^:]+):([^@]+)@([^:\/]+)\/([^?]+)\?ssl=(.+)/;
    const match = url.match(pattern);
    if (!match) throw new Error('Invalid DATABASE_URL format');

    return {
        user: match[1],
        password: match[2],
        host: match[3],
        database: match[4],
        ssl: JSON.parse(decodeURIComponent(match[5])),
    };
};

const { user, password, host, database, ssl } = parseDatabaseUrl(process.env.DATABASE_URL);

const connection = mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: ssl
});
export const db = connection.promise();