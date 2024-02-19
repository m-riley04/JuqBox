import { ChangeEvent, FormEvent, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/Auth0/LoginButton";
import { createRoom, generateRoomCode } from "../server/roomRequests";

function HostRoom() {
    const navigate = useNavigate();

    const [roomName, setRoomName] = useState("My Room");
    const [roomMaxGuests, setRoomMaxGuests] = useState(50);
    const [roomMaxCoexistentQueues, setRoomMaxCoexistentQueues] = useState(5);
    const [roomQueueCost, setRoomQueueCost] = useState(0);

    const { isAuthenticated, user, error } = useAuth0();

    //#region Component Handlers
    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setRoomName(event.target.value);
    }

    function handleMaxGuestsChange(event: ChangeEvent<HTMLInputElement>) {
        setRoomMaxGuests(Number(event.target.value));
    }

    function handleMaxConcurrentQueuesChange(event: ChangeEvent<HTMLInputElement>) {
        setRoomMaxCoexistentQueues(Number(event.target.value));
    }

    function handleCostPerQueueChange(event: ChangeEvent<HTMLInputElement>) {
        setRoomQueueCost(Number(event.target.value));
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
    }
    //#endregion Component Handlers

    async function handleCreateRoom() {
        // Generate a room code/id
        const code = await generateRoomCode();

        // Check if the code was generated has exceeded
        if (code === "-1") {
            console.warn("Unable to find a room code.")
        }

        // Create the room
        createRoom({
            id: code,
            code: code,
            name: roomName,
            owner: user?.sub || "",
            max_guests: roomMaxGuests,
            guest_ids: "{}",
            max_queues_per_guest: roomMaxCoexistentQueues,
            queue_cost: roomQueueCost
        })

        // Redirect to another page
        navigate(`../host/${code}`)
    }

    if (error) return (
        <>
            <div className="centeredContainer">
                <h1>Please login first to start hosting!</h1>
                <p>Error: {error.message}</p>
                <LoginButton></LoginButton>
            </div>
        </>
    );

    if (!isAuthenticated) return (
        <>
            <div className="centeredContainer">
                <h1>Please login first to start hosting!</h1>
                <LoginButton></LoginButton>
            </div>
        </>
    );

    if (isAuthenticated) return (
        <>
            <div className="container">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="roomName">
                        <Form.Label>Room Name</Form.Label>
                        <Form.Control 
                            type="name"
                            //defaultValue="My Room"
                            onChange={handleNameChange}
                            placeholder={`${user?.nickname}'s Room`}
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
                    <button onClick={handleCreateRoom}>Create Room</button>
                </Form>
                <button onClick={() => {
                    console.log(user);
                }}>Show User Data</button>
            </div>
        </>
    );

    return (
        <>
            <h1>Unexpected error has occurred with authorization</h1>
            <p>Please refresh the page and try again.</p>
        </>
    )
}

export default HostRoom;