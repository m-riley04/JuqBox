import type { Handler, HandlerEvent } from "@netlify/functions";
import connection from "@netlify/planetscale";

/**
 * Interface for the room table's rows
 * @key the title of the column
 * @value the value of the column
 */
export interface Room {
    id: string,
    code: string,
    name: string,
    owner: string,
    max_guests: number,
    guest_ids: number[],
    max_queues_per_guest: number,
    queue_cost: number
}

// Function to get count of all rooms
async function getRoomCount() {
    const count = await connection.execute(`SELECT COUNT(*) FROM rooms`);
    return JSON.stringify(count);
}

// Function to add a room
async function addRoom(body: string) {
    const { values } = JSON.parse(body);
    const VALID_HEADERS = ["id", "code", "name", "owner", "max_guests", "max_queues_per_guest", "queue_cost"];
    const placeholders = VALID_HEADERS.filter(key => Object.keys(values).includes(key)).map(() => '?').join(', ');
    const headers = VALID_HEADERS.filter(key => Object.keys(values).includes(key));
    const vals = headers.map(header => values[header]);
    const query = `INSERT INTO rooms (${headers.join(', ')}) VALUES ( ${placeholders} );`;
    await connection.execute(query, vals);
    return "Room added successfully";
}

// Function to remove a room
async function removeRoom(body: string) {
    const { code } = JSON.parse(body);
    const query = "DELETE FROM rooms WHERE code = ?"
    await connection.execute(query, [code]);
    return "Room removed successfully";
}

// Function to get all rooms
async function getAllRooms() {
    const rows = await connection.execute(`SELECT * FROM rooms`);
    return JSON.stringify(rows);
}

// Function to get a room's data by code
async function getRoom(code: string) {
    const query = "SELECT * FROM rooms WHERE code = ?";
    const room = await connection.execute(query, [code]);
    return JSON.stringify(room);
}

// Function to get a room's name by code
async function getRoomName(code: string) {
    const query = "SELECT name FROM rooms WHERE code = ?";
    const name = await connection.execute(query, [code]);
    return JSON.stringify(name);
}

// Function to get a room's owner by code
async function getRoomOwner(code: string) {
    const query = "SELECT owner FROM rooms WHERE code = ?";
    const owner = await connection.execute(query, [code]);
    return JSON.stringify(owner);
}

// Function to check a room's code
async function checkRoomCode(code: string) {
    const query = "SELECT * FROM rooms WHERE code = ?";
    const count = await connection.execute(query, [code]);
    return JSON.stringify(count);
}

export const handler: Handler = async (event: HandlerEvent) => {
    const { httpMethod, path, body } = event;

    try {
        if (httpMethod === "POST" && path.includes("/addRoom")) {
            if (!body) throw new Error("'body' is required");
            return { statusCode: 201, body: await addRoom(body) };
        } 
        else if (httpMethod === "DELETE" && path.includes("/removeRoom")) {
            if (!body) throw new Error("'body' is required");
            return { statusCode: 200, body: await removeRoom(body) };
        } 
        else if (httpMethod === "GET" && path.includes("/getRoomCount")) {
            return { statusCode: 200, body: await getRoomCount() };
        } 
        else if (httpMethod === "GET" && path.includes("/getAllRooms")) {
            return { statusCode: 200, body: await getAllRooms() };
        }
        else if (httpMethod === "GET" && path.includes("/getRoom")) {
            const [, , , , , code] = path.split("/");
            return { statusCode: 200, body: await getRoom(code) };
        }
        else if (httpMethod === "GET" && path.includes("/getRoomName")) {
            const [, , , , , code] = path.split("/");
            return { statusCode: 200, body: await getRoomName(code) };
        }
        else if (httpMethod === "GET" && path.includes("/getRoomOwner")) {
            const [, , , , , code] = path.split("/");
            return { statusCode: 200, body: await getRoomOwner(code) };
        }
        else if (httpMethod === "GET" && path.includes("/checkRoomCode")) {
            const [, , , , , code] = path.split("/");
            return { statusCode: 200, body: await checkRoomCode(code) };
        } 
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }

    return { statusCode: 400, body: "Unsupported room operation" };
};