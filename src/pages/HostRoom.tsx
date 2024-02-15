import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Room } from "../../netlify/functions/database";
import { useNavigate } from "react-router-dom";

function HostRoom() {
    const navigate = useNavigate();

    const [roomName, setRoomName] = useState("My Room");
    const [roomMaxGuests, setRoomMaxGuests] = useState(50);
    const [roomMaxCoexistentQueues, setRoomMaxCoexistentQueues] = useState(5);
    const [roomQueueCost, setRoomQueueCost] = useState(0);

    function handleNameChange(event) {
        setRoomName(event.target.value);
    }

    function handleMaxGuestsChange(event) {
        setRoomMaxGuests(event.target.value);
    }

    function handleMaxConcurrentQueuesChange(event) {
        setRoomMaxCoexistentQueues(event.target.value);
    }

    function handleCostPerQueueChange(event) {
        setRoomQueueCost(event.target.value);
    }

    function createRoom(room: Room) {

        const body = JSON.stringify({
            tableName: "rooms",
            values: room
        })
        fetch('/.netlify/functions/rooms/addRow', {
            method: 'POST',
            body
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

    async function isCodeTaken(code:number) {
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

    async function generateCode(timeout: number=10) {
        const min = 1_000_000;
        const max = 9_999_999;
        for (let i = 0; i < timeout; i++) {
            // Check if the room code is free
            const code = Math.floor((Math.random() * (max - min) + min));
            console.log(`Checking code ${code}...`);
            if (!await isCodeTaken(code)) {
                return code.toString()
            }
        }
        return "-1";
    }

    async function handleCreateRoom() {
        // Generate a room code/id
        const code = await generateCode();

        // Check if the code was generated has exceeded
        if (code === "-1") {
            console.warn("Unable to find a room code.")
        }

        // Create the room
        createRoom({
            id: code,
            code: code,
            name: roomName,
            max_guests: roomMaxGuests,
            guest_ids: [],
            max_queues_per_guest: roomMaxCoexistentQueues,
            queue_cost: roomQueueCost
        })

        // Redirect to another page
        navigate("../")
    }

    return (
        <>
            <Form>
                <Form.Group controlId="roomName">
                    <Form.Label>Room Name</Form.Label>
                    <Form.Control 
                        type="name"
                        //defaultValue="My Room"
                        onChange={handleNameChange}
                        placeholder="My Room"
                    />
                </Form.Group>

                <Form.Group controlId="maxGuests">
                    <Form.Label>Maximum Guests</Form.Label>
                    <Form.Range min={1} max={999} step={1} defaultValue={100} onChange={handleMaxGuestsChange}></Form.Range>
                </Form.Group>

                <Form.Group controlId="maxCocurrentQueues">
                    <Form.Label>Maximum Concurrent Queues</Form.Label>
                    <Form.Range min={1} max={50} step={1} defaultValue={10} onChange={handleMaxConcurrentQueuesChange}></Form.Range>
                </Form.Group>

                <Form.Group controlId="costPerQueue">
                    <Form.Label>Cost Per Queue</Form.Label>
                    <Form.Range min={0} max={5} step={0.25} defaultValue={0} onChange={handleCostPerQueueChange}></Form.Range>
                </Form.Group>
            </Form>

            <Button onClick={handleCreateRoom}>Create Room</Button>
        </>
    );
}

export default HostRoom;