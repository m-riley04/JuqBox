import { useEffect, useState } from "react";

function Admin() {
    const [password, setPassword] = useState<string | null>("");
    const [passwordAccepted, setPasswordAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    function handleAddRow() {
        setLoading(true);
        fetch('/.netlify/functions/database/addRow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'test room',
                code: 12345,
                guest_ids: [],
                max_queries_per_guest: 5,
                queue_cost: 0
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not okay");
            }
            return response.json();
        })
        .then(data => {
            setData(data);
            console.log(data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
        })
    }

    function handleGetRooms() {
        setLoading(true);
        const response = fetch('/.netlify/functions/database/getAllRooms', { method: "GET" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not okay");
            }
            return response.json();
        })
        .then(data => {
            setData(data);
            console.log(data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
        })
    }

    function handleGetUsers() {
        //setLoading(true);
        const response = fetch('/.netlify/functions/database/getAllUsers', { method: "GET" });
        /*
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not okay");
            }
            return response.json();
        })
        .then(data => {
            setData(data);
            console.log(data);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
        })
        */
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
    
    
    if (passwordAccepted) return (
        <>
            <button onClick={handleAddRow}>Add row</button>
            <button onClick={handleGetRooms}>Read rows</button>
            <button onClick={handleGetUsers}>Get users</button>
        </>
    );
    
    if (loading) return (
        <>
            <p>Loading...</p>
        </>
    );

    if (data) return (
        <>
            <button onClick={handleAddRow}>Add row</button>
            <button onClick={handleGetRooms}>Get rows</button>
            <button onClick={handleGetUsers}>Get users</button>
            <p>{data}</p>
        </>
    );

    return (
        <>
            <p>You do not have access to this page.</p>
        </>
    );
}

export default Admin;