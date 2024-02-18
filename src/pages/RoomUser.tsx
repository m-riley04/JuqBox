import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Room } from "../../netlify/functions/rooms";
import { Form } from "react-bootstrap";

function RoomUser() {
    let params = useParams();

    const [roomData, setRoomData] = useState<Room>();
    const [guestNameSelected, setGuestNameSelected] = useState(false);
    const [guestName, setGuestName] = useState("user");
    const [guestId, setGuestId] = useState("");

    function getRoomData() {
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

    function handleUpdateGuests() {
        
        updateGuests(roomData?.guest_ids);
    }

    function generateGuestId(timeout: number, guests?: string[]) {
        function isIdTaken(id: number, guests?: string[]) {
            console.log(`Checking guest id '${id}'...`);
            return guests?.includes(String(id))
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

    function handleGenerateUserId() {
        try {
            const id = generateGuestId(10, roomData?.guest_ids);
            setGuestId(id);
        } catch (e) {
            console.error(e);
        }
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