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
async function addRoom(body: string | null) {
    const { values } = JSON.parse(body);
    const headers = Object.keys(values).map(s => `${s}`).join(', ');
    const vals = Object.values(values).map(s => `'${s}'`).join(', ');
    await connection.execute(`INSERT INTO rooms (${headers}) VALUES (${vals});`);
    return "Room added successfully";
}

// Function to remove a room
async function removeRoom(body: string | null) {
    const { id } = JSON.parse(body);
    await connection.execute(`DELETE FROM rooms WHERE id='${id}'`);
    return "Room removed successfully";
}

// Function to get all rooms
async function getAllRooms() {
    const rows = await connection.execute(`SELECT * FROM rooms`);
    return JSON.stringify(rows);
}

// Function to check a room's code
async function checkRoomCode(code: string) {
    const count = await connection.execute(`SELECT code FROM rooms WHERE code='${code}'`);
    return JSON.stringify(count);
}

export const handler: Handler = async (event: HandlerEvent) => {
    const { httpMethod, path, body } = event;

    try {
        if (httpMethod === "POST" && path.includes("/addRoom")) {
            return { statusCode: 201, body: await addRoom(body) };
        } 
        else if (httpMethod === "DELETE" && path.includes("/removeRoom")) {
            return { statusCode: 200, body: await removeRoom(body) };
        } 
        else if (httpMethod === "GET" && path.includes("/getRoomCount")) {
            return { statusCode: 200, body: await getRoomCount() };
        } 
        else if (httpMethod === "GET" && path.includes("/getAllRooms")) {
            return { statusCode: 200, body: await getAllRooms() };
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