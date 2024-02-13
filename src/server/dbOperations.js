import { db } from './database.js';

// Function to create a table
export const createTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS example_table (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    await db.query(sql);
    console.log("Table created successfully.");
};

// Function to add a row
export const addRow = async (name) => {
    const sql = 'INSERT INTO example_table (name) VALUES (?)';
    const [result] = await db.query(sql, [name]);
    console.log("Row added, ID:", result.insertId);
};

// Function to remove a row
export const removeRow = async (id) => {
    const sql = 'DELETE FROM example_table WHERE id = ?';
    await db.query(sql, [id]);
    console.log(`Row with ID ${id} removed successfully.`);
};

// Function to read all rows from a table
export const getAllRows = async (tableName) => {
    const sql = `SELECT * FROM ??`;
    const [rows] = await db.query(sql, [tableName]);
    return rows;
};

// Function to read a specific row by ID
export const getRowById = async (tableName, id) => {
    const sql = `SELECT * FROM ?? WHERE id = ?`;
    const [rows] = await db.query(sql, [tableName, id]);
    return rows.length > 0 ? rows[0] : null;
};