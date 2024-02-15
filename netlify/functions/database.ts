import type { Handler, HandlerEvent } from "@netlify/functions";
import connection from "@netlify/planetscale";

// Function to create a table
async function createTable(body: string | null) {
    const { schema } = JSON.parse(body);
    await connection.execute(schema);
    return "Table created successfully";
}

// Function to get count of all rows
async function getRowCount(tableName:string) {
    const count = await connection.execute(`SELECT COUNT(*) FROM ${tableName}`);
    return JSON.stringify(count);
}

// Function to add a row
async function addRow(body: string | null) {
    const { tableName, values } = JSON.parse(body);
    const headers = Object.keys(values).map(s => `${s}`).join(', ');
    const vals = Object.values(values).map(s => `'${s}'`).join(', ');
    await connection.execute(`INSERT INTO ${tableName} (${headers}) VALUES (${vals});`);
    return "Row added successfully";
}

// Function to remove a row
async function removeRow(body: string | null) {
    const { tableName, id } = JSON.parse(body);
    await connection.execute(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
    return "Row removed successfully";
}

// Function to get all rows from a table
async function getAllRows(tableName: string | undefined) {
    const rows = await connection.execute(`SELECT * FROM ${tableName}`);
    return JSON.stringify(rows);
}

// Function to get a row by ID
async function getRowById(tableName: string | undefined, id: string | undefined) {
    const row = await connection.execute(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
    return JSON.stringify(row);
}

// Function to update a row
async function updateRow(body: string | null) {
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
        } 
        else if (httpMethod === "POST" && path.includes("/addRow")) {
            return { statusCode: 201, body: await addRow(body) };
        } 
        else if (httpMethod === "PUT" && path.includes("/updateRow")) {
            return { statusCode: 201, body: await updateRow(body) };
        } 
        else if (httpMethod === "DELETE" && path.includes("/removeRow")) {
            return { statusCode: 200, body: await removeRow(body) };
        } 
        else if (httpMethod === "GET" && path.includes("/getAllRows")) {
            const [, , , , , tableName] = path.split("/");
            return { statusCode: 200, body: await getAllRows(tableName) };
        } 
        else if (httpMethod === "GET" && path.includes("/getRowById")) {
            const [, , , , , tableName, id] = path.split("/");
            return { statusCode: 200, body: await getRowById(tableName, id) };
        }
        else if (httpMethod === "GET" && path.includes("/getRowCount")) {
            const [, , , , , tableName] = path.split("/");
            return { statusCode: 200, body: await getRowCount(tableName) };
        } 
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 400, body: "Unsupported operation" };
};