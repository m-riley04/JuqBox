import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Room } from "../../netlify/functions/rooms";
import { Form } from "react-bootstrap";
import { generateGuestId, getRoomData, updateRoomGuests } from "../server/roomRequests";

function RoomUser() {
    const params = useParams();

    const [roomData, setRoomData] = useState<Room>();
    const [guestNameSelected, setGuestNameSelected] = useState(false);
    const [guestName, setGuestName] = useState("user");
    const [guestId, setGuestId] = useState("");
    const [guests, setGuests] = useState([]);

    function handleGetRoomData() {
        getRoomData(Number(params.code))
        .then(data => {
            setRoomData(data);
            if (data.guests) setGuests(JSON.parse(data.guests)); console.log(JSON.parse(data.guests));
        })
        .catch(error => {
            console.error(error);
        })
    }

    function handleUpdateGuests() {
        if (!roomData) {
            // Catch if the room data is empty
            throw new Error("Error updating guests: room data is empty");
        }

        console.log(JSON.stringify(guests));
        updateRoomGuests(JSON.stringify(guests));
    }

    function handleGenerateUserId() {
        try {
            const id = generateGuestId(10, roomData?.guests);
            setGuestId(id);
        } catch (e) {
            console.error(e);
        }
    }

    function handleGuestNameChange(event: ChangeEvent<HTMLInputElement>) {
        setGuestName(event.target.value);
    }

    function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // TODO - check if guest name is valid

        setGuestNameSelected(true);

        handleUpdateGuests();
    }

    useEffect(() => {
        handleGetRoomData();

        // Generate a user id
        handleGenerateUserId();
    }, [])

    if (!guestNameSelected) return (
        <>
            <h1>You are now joining '{roomData?.name}'</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Guest Name</Form.Label>
                    <Form.Control placeholder="Type your name here..." onChange={handleGuestNameChange}></Form.Control>
                </Form.Group>
                <button>Enter Room</button>
            </Form>
        </>
    );

    return (
        <>
            <h1>Welcome to '{roomData?.name}', {guestName}!</h1>
            <p>You can <a>share the code</a> with your friends!</p>

            <p>Currently Playing: [song name]</p>

            <h2>Select the songs you'd like to queue:</h2>
            <p>[to be implemented]</p>
        </>
    );
}

export default RoomUser;