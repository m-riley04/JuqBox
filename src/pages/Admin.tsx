import { useEffect, useState } from "react";

function Admin() {
    const [password, setPassword] = useState<string | null>("");
    const [passwordAccepted, setPasswordAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    function handleAddRow() {
        setLoading(true);
        fetch('/api/addRow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tableName: 'rooms',
                values: ["test room", 12345, [], 5, 0]
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error("Network response was not okay");
            }
        }).then(data => {
            setData(data);
            console.log(data);
            setLoading(false);
        }).catch(error => {
            console.error(error);
            setLoading(false);
        })
    }

    useEffect(() => {
        setPassword(prompt("Please enter the admin password", ""));

        if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
            setPasswordAccepted(true);
        }
    }, [password]);
    
    
    if (passwordAccepted) return (
        <>
            <button onClick={handleAddRow}>Add row</button>
        </>
    );

    return (
        <>
            <p>You do not have access to this page.</p>
        </>
    );
}

export default Admin;