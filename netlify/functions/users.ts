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

// Get count of all users
async function getUserCount() {
    const count = await connection.execute(`SELECT COUNT(*) FROM users`);
    return JSON.stringify(count);
}

// Add a user
async function addUser(body: string) {
    const { values } = JSON.parse(body);
    const headers = Object.keys(values).map(s => `${s}`).join(', ');
    const vals = Object.values(values).map(s => `'${s}'`).join(', ');
    await connection.execute(`INSERT INTO users (${headers}) VALUES (${vals});`);
    return "User added successfully";
}

// Remove a user
async function removeUser(body: string) {
    const { id } = JSON.parse(body);
    await connection.execute(`DELETE FROM users WHERE id = '${id}'`, [id]);
    return "User removed successfully";
}

// Get all users
async function getAllUsers() {
    const rows = await connection.execute(`SELECT * FROM users`);
    return JSON.stringify(rows);
}

// Check if a username exists
async function checkUserUsername(username: string) {
    const count = await connection.execute(`SELECT username FROM users WHERE username='${username}'`);
    return JSON.stringify(count);
}

// Check if an email address exists
async function checkUserEmail(email: string) {
    const count = await connection.execute(`SELECT email FROM users WHERE email='${email}'`);
    return JSON.stringify(count);
}

export const handler: Handler = async (event: HandlerEvent) => {
    const { httpMethod, path, body } = event;

    try {
        if (httpMethod === "POST" && path.includes("/addUser")) {
            return { statusCode: 201, body: await addUser(body) };
        } 
        else if (httpMethod === "DELETE" && path.includes("/removeUser")) {
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