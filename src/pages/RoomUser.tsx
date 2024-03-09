import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Guest, Room } from "../../netlify/functions/rooms";
import { Form } from "react-bootstrap";
import { generateGuestId, getRoomData, updateRoomGuests } from "../server/roomRequests";
import SpotifySongSearcher from "../components/Spotify/SpotifySongSearcher";

function RoomUser() {
    const params = useParams();

    const [roomData, setRoomData] = useState<Room>();
    const [guestNameSelected, setGuestNameSelected] = useState(false);
    const [guestName, setGuestName] = useState("user");
    const [guestId, setGuestId] = useState("");
    const [guests, setGuests] = useState<Guest[]>([]);

    function handleUpdateGuests() {
        if (!roomData) {
            // Catch if the room data is empty
            throw new Error("Error updating guests: room data is empty");
        }
        // Append the current new guest
        const guest : Guest = {
            id: Number(guestId),
            name: guestName,
            queues_total: 0,
            queues: []
        };
        guests.push(guest);

        updateRoomGuests({guests: guests}, Number(params.code));
    }

    function handleGuestNameChange(event: ChangeEvent<HTMLInputElement>) {
        setGuestName(event.target.value);
    }

    function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // TODO - check if guest name is valid/repeat

        setGuestNameSelected(true);

        handleUpdateGuests();
    }

    useEffect(() => {
        function handleGenerateUserId() {
            try {
                const id = generateGuestId(10, guests);
                setGuestId(id);
            } catch (e) {
                console.error(e);
            }
        }

        function handleGetRoomData() {
            getRoomData(Number(params.code))
            .then((data : Room) => {
                setRoomData(data);
                if (data) {
                    if (data.guests) { 
                        const guestJson = data.guests;
                        setGuests(guestJson.guests); 
                    }
                }
            })
            .catch(error => {
                console.error(error);
            })
        }

        handleGetRoomData();

        // Generate a user id
        handleGenerateUserId();
    }, [])

    if (!roomData) return (
        <>
            <h1>This room does not exist.</h1>
        </>
    )

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
            <SpotifySongSearcher/>
        </>
    );
}

export default RoomUser;