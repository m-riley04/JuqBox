import { useEffect, useState } from "react";

function Admin() {
    const [password, setPassword] = useState<string | null>("");
    const [passwordAccepted, setPasswordAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    function handleAddRoom() {
        const body = JSON.stringify({
            values: {
                name: "test room",
                code: 12345,
                guest_ids: [],
                max_queues_per_guest: 5,
                queue_cost: 0
            }
        })
        fetch('/.netlify/functions/rooms/addRoom', {
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

    function handleAddUser() {
        const body = JSON.stringify({
            values: {
                id: 0,
                username: "test",
                password_hash: "admin123",
                email: "test@example.com"
            }
        })
        fetch('/.netlify/functions/users/addUser', {
            method: 'POST',
            body
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not okay");
            }
            console.log("User created successfully!");
        })
        .catch(error => {
            console.error(error);
        })
    }

    function handleGetRooms() {
        fetch('/.netlify/functions/rooms/getAllRooms', { method: "GET" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not okay");
            }
            return response.json();
        })
        .then(data => {
            setData(data);
            console.log(`Rooms: ${JSON.stringify(data)}`);
        })
        .catch(error => {
            console.error(error);
        })
    }

    function handleGetUsers() {
        const response = fetch('/.netlify/functions/database/getAllUsers', { method: "GET" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not okay");
            }
            return response.json();
        })
        .then(data => {
            setData(data);
            console.log(`Users: ${JSON.stringify(data)}`);
        })
        .catch(error => {
            console.error(error);
        })
    }

    useEffect(() => {
        const input = prompt("Please enter the admin password", "");
        setPassword(input);
        console.log(`You inputted: ${input}`);

        if (input === import.meta.env.VITE_ADMIN_PASSWORD) {
            setPasswordAccepted(true);
            console.log("Password accepted!");
        }
    }, []);

    if (loading) return (
        <>
            <p>Loading...</p>
        </>
    );

    if (passwordAccepted) return (
        <>
            <button onClick={handleAddRoom}>Add room</button>
            <button onClick={handleAddUser}>Add user</button>
            <button onClick={handleGetRooms}>Read rows</button>
            <button onClick={handleGetUsers}>Get users</button>
        </>
    );

    return (
        <>
            <p>You do not have access to this page.</p>
        </>
    );
}

export default Admin;