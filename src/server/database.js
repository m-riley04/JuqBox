import mysql from 'mysql2';
const connection = mysql.createPool({
    host: 'your-database-host',
    user: 'your-database-user',
    password: 'your-database-password',
    database: 'your-database-name',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
export const db = connection.promise();