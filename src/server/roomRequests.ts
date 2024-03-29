import { Guest, Room } from "../../netlify/functions/rooms";

export async function createRoom(room: Room) {

    const body = JSON.stringify({
        values: room
    })
    return await fetch('/.netlify/functions/rooms/addRoom', {
        method: 'POST',
        body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not okay");
        }
        console.log("Room created successfully!");
    })
    .catch(error => {
        console.error(error);
    })
}

export async function removeRoom(roomCode:number) {
    const body = JSON.stringify({
        code: roomCode
    })
    return await fetch('/.netlify/functions/rooms/removeRoom', {
        method: 'DELETE',
        body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not okay");
        }
        console.log("Room deleted successfully!");
    })
    .catch(error => {
        console.error(error);
    })
}

export async function doesRoomExist(code:number) {
    console.log("Checking room code...");

    try {
        const response = await fetch(`/.netlify/functions/rooms/checkRoomCode/${code}`, { method: 'GET' })
        const result = await response.json();

        if (result.rows.length > 0) {
            return true;
        }
        return false;

    } catch (error) {
        console.error(`Unable to check code: ${error}`);
        return true;
    }
}

export async function generateRoomCode(timeout: number=10) {
    const min = 1_000_000;
    const max = 9_999_999;
    for (let i = 0; i < timeout; i++) {
        // Check if the room code is free
        const code = Math.floor((Math.random() * (max - min) + min));
        if (!await doesRoomExist(code)) {
            return code.toString()
        }
    }
    return "-1";
}

export async function updateRoomGuests(guests: object, code: number) {
    const body : string = JSON.stringify({
        guests,
        code
    })
    return await fetch('/.netlify/functions/rooms/updateRoomGuestList', {
        method: "PUT",
        body: body
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not okay");
        }
        console.log("Guests updated successfully!");
        return 200;
    })
    .catch(error => {
        console.error(error);
    })
}

export async function getRoomData(code: number) {
    try {
        const response = await fetch(`/.netlify/functions/rooms/getRoom/${code}`, { method: 'GET' });
        const result = await response.json();

        return result["rows"][0];

    } catch (error) {
        console.error(`Unable to get room data: ${error}`);
        return undefined;
    }
}

export async function getRoomGuests(code: number) {
    try {
        const response = await fetch(`/.netlify/functions/rooms/getRoomGuests/${code}`, { method: 'GET' });
        const result = await response.json();

        return result
    } catch (error) {
        console.error(`Unable to get room guests: ${error}`);
        return undefined;
    }
}

export function generateGuestId(timeout: number, guests?: Guest[]) {
    function isIdTaken(id: number, guests?: Guest[]) {
        console.log(`Checking guest id '${id}'...`);

        return guests?.forEach((guest, index) => {
            if (guest.id === id) return true;
        }); 
    }

    const min = 1_000_000;
    const max = 9_999_999;
    for (let i = 0; i < timeout; i++) {
        // Check if the room code is free
        const id = Math.floor((Math.random() * (max - min) + min));
        if (!isIdTaken(id, guests)) {
            return id.toString()
        }
    }
    
    throw new Error("Unable to generate id (timed out)")
}