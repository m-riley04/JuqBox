import express from 'express';
import * as dbOps from './dbOperations.js';

// const { PrismaClient } = require('@prisma/client'); // If using Prisma
// const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Route to create a table
app.get('/api/create-table', async (req, res) => {
    try {
        await dbOps.createTable();
        res.send("Table created successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating table.");
    }
});

// Route to add a row
app.post('/api/add-row', async (req, res) => {
    try {
        const { name } = req.body;
        await dbOps.addRow(name);
        res.send("Row added successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding row.");
    }
});

// Route to remove a row
app.post('/api/remove-row', async (req, res) => {
    try {
        const { name } = req.body;
        await dbOps.removeRow(name);
        res.send("Row removed successfully.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error removing row.");
    }
});

// Route to get all rows from a table
app.get('/api/data/:tableName', async (req, res) => {
    try {
        const { tableName } = req.params;
        const rows = await dbOps.getAllRows(tableName);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data.' });
    }
});

// Route to get a specific row by ID
app.get('/api/data/:tableName/:id', async (req, res) => {
    try {
        const { tableName, id } = req.params;
        const row = await dbOps.getRowById(tableName, id);
        if (row) {
            res.json(row);
        } else {
            res.status(404).json({ message: 'Row not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});