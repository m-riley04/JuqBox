import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function RoomHost() {
    const params = useParams();
    const navigate = useNavigate();
    const [roomExists, setRoomExists] = useState(false);

    //#region Server Handlers
    function removeRoom(roomCode:number) {
        const body = JSON.stringify({
            code: roomCode
        })
        fetch('/.netlify/functions/rooms/removeRoom', {
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

    async function doesRoomExist(code:number) {
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

    function handleRoomClose() {
        // Delete the room from the database
        removeRoom(Number(params.code));
    }

    function handleCheckRoom() {
        doesRoomExist(Number(params.code))
            .then(result => {
                setRoomExists(result);
            })
            .catch(error => {
                console.error(error);
            })
    }
    //#endregion Server Handlers

    //#region Component Handlers
    function handleClickCloseRoom() {
        if (confirm("Are you sure you want to close the room?")) {
            removeRoom(Number(params.code));
            navigate("../");
        }
    }

    function handleClickSettings() {

    }

    function handleClickManageUsers() {

    }

    function handleClickHost() {
        navigate("../host");
    }
    //#endregion Component Hanlders

    useEffect(() => {
        // Check if the room exists
        handleCheckRoom();

        window.onbeforeunload = () => {
            // Close the room
            handleRoomClose();
        }
    }, [])
    
    // Check if the room exists
    if (roomExists) return (
        <>
            <h1>Code: {params.code}</h1>
            <p>Join the queue now at <a href="juqbox.space/join" target="_blank" rel="noreferrer">juqbox.space/join</a></p>
            <button onClick={handleClickCloseRoom}>Close Room</button>
            <button onClick={handleClickSettings}>Settings</button>
            <button onClick={handleClickManageUsers}>ManageUsers</button>
        </>
    );

    // If the room doesn't exist
    return (
        <>
            <h1>This room does not exist.</h1>
            <button onClick={handleClickHost}>Host another room</button>
        </>
    );
}

export default RoomHost;