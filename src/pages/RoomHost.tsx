import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doesRoomExist, removeRoom } from "../server/roomRequests";

function RoomHost() {
    const params = useParams();
    const navigate = useNavigate();
    const [roomExists, setRoomExists] = useState(false);

    function handleCheckRoom() {
        doesRoomExist(Number(params.code))
            .then(result => {
                setRoomExists(result);
            })
            .catch(error => {
                console.error(error);
            })
    }

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
            // Delete the room from the database
            removeRoom(Number(params.code));
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