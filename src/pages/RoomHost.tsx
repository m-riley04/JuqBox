import { useEffect } from "react";
import { useParams } from "react-router-dom";

function RoomHost() {
    let params = useParams();

    function removeRoom(roomCode:number) {
        const body = JSON.stringify({
            values: roomCode
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

    function handleRoomClose() {
        // Delete the room from the database
        removeRoom(params.code);
    }

    useEffect(() => {
        // Check if the page is closing
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();

            // Close the room
            handleRoomClose();
        });
    }, [])
    


    return (
        <>
            <h1>Code: {params.code}</h1>
            <p>Join the queue now at <a href="juqbox.space/join" target="_blank" rel="noreferrer">juqbox.space/join</a></p>
        </>
    );
}

export default RoomHost;