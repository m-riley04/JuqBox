import type { Handler, HandlerEvent } from "@netlify/functions";
import connection from "@netlify/planetscale";

/**
 * Interface for the user table's rows
 * @key the title of the column
 * @value the value of the column
 */
export interface User {
    id: number,
    username: string,
    password_hash: string,
    email: string
}

// Add a user
async function addUser(body: string) {
    const { values } = JSON.parse(body);
    const VALID_HEADERS = ["id", "username", "password_hash", "email"];
    const placeholders = VALID_HEADERS.filter(key => Object.keys(values).includes(key)).map(() => '?').join(', ');
    const headers = VALID_HEADERS.filter(key => Object.keys(values).includes(key));
    const vals = headers.map(header => values[header]);
    const query = `INSERT INTO users (${headers.join(', ')}) VALUES ( ${placeholders} );`;
    await connection.execute(query, [headers, vals]);
    return "User added successfully";
}

// Remove a user
async function removeUser(body: string) {
    const { id } = JSON.parse(body);
    const query = "DELETE FROM users WHERE id = ?"
    await connection.execute(query, [id]);
    return "User removed successfully";
}

// Get count of all users
async function getUserCount() {
    const count = await connection.execute(`SELECT COUNT(*) FROM users`);
    return JSON.stringify(count);
}

// Get all users
async function getAllUsers() {
    const rows = await connection.execute(`SELECT * FROM users`);
    return JSON.stringify(rows);
}

// Check if a username exists
async function checkUserUsername(username: string) {
    const query = "SELECT username FROM users WHERE username = ?";
    const count = await connection.execute(query, [username]);
    return JSON.stringify(count);
}

// Check if an email address exists
async function checkUserEmail(email: string) {
    const query = "SELECT email FROM users WHERE email = ?";
    const count = await connection.execute(query, [email]);
    return JSON.stringify(count);
}

export const handler: Handler = async (event: HandlerEvent) => {
    const { httpMethod, path, body } = event;

    try {
        if (httpMethod === "POST" && path.includes("/addUser")) {
            if (!body) throw new Error("'body' is required");
            return { statusCode: 201, body: await addUser(body) };
        } 
        else if (httpMethod === "DELETE" && path.includes("/removeUser")) {
            if (!body) throw new Error("'body' is required");
            return { statusCode: 200, body: await removeUser(body) };
        } 
        else if (httpMethod === "GET" && path.includes("/getUserCount")) {
            return { statusCode: 200, body: await getUserCount() };
        } 
        else if (httpMethod === "GET" && path.includes("/checkUserUsername")) {
            const [, , , , , username] = path.split("/");
            return { statusCode: 200, body: await checkUserUsername(username) };
        } 
        else if (httpMethod === "GET" && path.includes("/checkUserEmail")) {
            const [, , , , , email] = path.split("/");
            return { statusCode: 200, body: await checkUserEmail(email) };
        } 
        else if (httpMethod === "GET" && path.includes("/getAllUsers")) {
            return { statusCode: 200, body: await getAllUsers() };
        }
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 400, body: "Unsupported user operation" };
};