import type { Handler, HandlerEvent } from "@netlify/functions";
import connection from "@netlify/planetscale";

// Function to create a table
async function createTable(body: string) {
    const { schema } = JSON.parse(body);
    await connection.execute(schema);
    return "Table created successfully";
}

// Function to add a row
async function addRow(body: string) {
    const { tableName, values } = JSON.parse(body);
    const placeholders = values.map(() => '?').join(', ');
    await connection.execute(`INSERT INTO ${tableName} VALUES (${placeholders})`, values);
    return "Row added successfully";
}

// Function to remove a row
async function removeRow(body: string) {
    const { tableName, id } = JSON.parse(body);
    await connection.execute(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
    return "Row removed successfully";
}

// Function to get all rows
async function getAllRows(tableName: string) {
    const [rows] = await connection.execute(`SELECT * FROM ${tableName}`);
    return JSON.stringify(rows);
}

// Function to get a row by ID
async function getRowById(tableName: string, id: string) {
    const [row] = await connection.execute(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
    return JSON.stringify(row);
}

// Function to update a row
async function updateRow(body: string) {
    const { tableName, id, values } = JSON.parse(body);
    const setClause = Object.keys(values).map(key => `${key} = ?`).join(', ');
    const queryParams = [...Object.values(values), id];
    await connection.execute(`UPDATE ${tableName} SET ${setClause} WHERE id = ?`, queryParams);
    return "Row updated successfully";
}

export const handler: Handler = async (event: HandlerEvent) => {
    const { httpMethod, path, body } = event;

    try {
        if (httpMethod === "POST" && path.includes("/createTable")) {
            return { statusCode: 201, body: await createTable(body) };
        } else if (httpMethod === "POST" && path.includes("/addRow")) {
            return { statusCode: 201, body: await addRow(body) };
        } else if (httpMethod === "DELETE" && path.includes("/removeRow")) {
            return { statusCode: 200, body: await removeRow(body) };
        } else if (httpMethod === "GET" && path.includes("/getAllRows")) {
            const tableName = path.split("/").pop();
            return { statusCode: 200, body: await getAllRows(tableName) };
        } else if (httpMethod === "GET" && path.includes("/getRowById")) {
            const [, tableName, id] = path.split("/");
            return { statusCode: 200, body: await getRowById(tableName, id) };
        } else if (httpMethod === "PUT" && path.includes("/updateRow")) {
            return { statusCode: 200, body: await updateRow(body) };
        }
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 400, body: "Unsupported operation" };
};