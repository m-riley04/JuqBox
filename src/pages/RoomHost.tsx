import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doesRoomExist, getRoomData, removeRoom } from "../server/roomRequests";
import { useAuth0 } from "@auth0/auth0-react";
import { Guest } from "../../netlify/functions/rooms";
import QRCode from "react-qr-code";

function RoomHost() {
    const params = useParams();
    const navigate = useNavigate();
    const [roomExists, setRoomExists] = useState(false);
    const [userOwnsRoom, setUserOwnsRoom] = useState(false);
    const [guests, setGuests] = useState<Guest[]>([]);

    const { user } = useAuth0();

    async function handleCheckRoom() {
        await doesRoomExist(Number(params.code))
        .then(result => {
            setRoomExists(result);
        })
        .catch(error => {
            console.error(error);
        })
    }

    async function handleCheckRoomOwner() {
        await getRoomData(Number(params.code))
        .then(data => {
            // Check if the user owns this room
            console.log("Checking if the user owns this room...");
            if (user?.sub === data.owner) {
                setUserOwnsRoom(true);
            }
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

    function handleClickHost() {
        navigate("../host");
    }
    //#endregion Component Hanlders

    const REFRESH_MS = 10000;
    useEffect(() => {
        // Check if the room exists
        handleCheckRoom();

        // Get the current room data
        handleCheckRoomOwner();

        window.onbeforeunload = () => {
            // Delete the room from the database
            removeRoom(Number(params.code));
        }

        // Update the user list
        const interval = window.setInterval(() => {
            // Check if the room exists
            //if (!roomExists) return;

            // Get the guest list
            console.log("Refreshing the guest list...");
            getRoomData(Number(params.code))
                .then(data => {
                    if (!data.guests) {
                        setGuests([]);
                        return;
                    }
                    try {
                        setGuests(data.guests.guests);
                    } catch (e) {
                        console.error(e);
                    }
                    //setGuests(data.guests);
                });
        }, REFRESH_MS);

        return () => window.clearInterval(interval);
    }, []);
    

    // Check if the room exists
    if (roomExists && userOwnsRoom) return (
        <>
            <h1>Code: {params.code}</h1>
            <p>Join the queue now at <a href="www.juqbox.space/join" target="_blank" rel="noreferrer">juqbox.space/join</a></p>
            <p>Current Guests:</p>
            {guests.map((guest, index) => <p key={index}>{index+1}. {guest.name}</p>)}
            <QRCode
                value={`${window.location.origin}/join/${params.code}`}
            ></QRCode>
            <button onClick={handleClickCloseRoom}>Close Room</button>
            <button onClick={handleClickSettings}>Settings</button>
        </>
    );

    if (!userOwnsRoom) return (
        <>
            <h1>You do not own this room.</h1>
            <button onClick={handleClickHost}>Host your own room</button>
        </>
    )

    // If the room doesn't exist
    return (
        <>
            <h1>This room does not exist.</h1>
            <button onClick={handleClickHost}>Host another room</button>
        </>
    );
}

export default RoomHost;