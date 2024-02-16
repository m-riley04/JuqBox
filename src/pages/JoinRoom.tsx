import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function JoinRoom() {
    const navigate = useNavigate();
    
    const [code, setCode] = useState(100000000);
    
    function handleChangeRoomCode(event: ChangeEvent<HTMLInputElement>){
        setCode(Number(event.target.value));
    }

    function handleClickedCamera() {
        console.log("Opening camera for QR code...")
    }

    async function handleJoinRoom(event: FormEvent) {
        // Stop page refreshing
        event?.preventDefault();

        // Ensure the room exists
        if (!await doesRoomExist(code)) {
            console.log("The room does not exist. Please try again")
            return;
        }

        console.log("Attempting to join room...")
        navigate(`../rooms/${code}`)
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

    return (
        <>
            <Form onSubmit={handleJoinRoom}>
                <Form.Group controlId="roomCode">
                    <Form.Label>Room Code</Form.Label>
                    <div style={{display: "inline-flex"}}>
                    <Form.Control type="name" placeholder="Enter the room code here..." onChange={handleChangeRoomCode}></Form.Control>
                    <Button onClick={handleClickedCamera}>QR</Button>
                    </div>
                    
                </Form.Group>
                <Button onClick={handleJoinRoom}>Join Room</Button>
            </Form>
        </>
    );
}

export default JoinRoom;