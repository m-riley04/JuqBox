import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Room } from "../../netlify/functions/rooms";
import { Form } from "react-bootstrap";

function RoomUser() {
    let params = useParams();

    const [roomData, setRoomData] = useState<Room>();
    const [guestName, setGuestName] = useState("");

    function getRoomName() {
        fetch(`/.netlify/functions/rooms/getRoomName/${params.code}`, {
            method: 'GET',
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

    function handleGuestNameChange(event: ChangeEvent<HTMLInputElement>) {
        setGuestName(event.target.value);
    }

    if (!guestName) return (
        <>
            <h1>You are now joining '{roomData?.name}'</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Guest Name</Form.Label>
                    <Form.Control placeholder="cooldude336" onChange={handleGuestNameChange}></Form.Control>
                </Form.Group>
            </Form>

            <p><a>Create an account</a> to never have to see this page again</p>
        </>
    );

    return (
        <>
            <h1>Welcome to '{params.code}'!</h1>
            <p>You can <a href="">share the code</a> with your friends!</p>

            <h2>Select the songs you'd like to queue:</h2>
            <p>(to be implemented)</p>
        </>
    );
}

export default RoomUser;