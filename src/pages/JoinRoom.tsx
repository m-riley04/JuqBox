import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { doesRoomExist } from "../server/roomRequests";

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
        navigate(`../join/${code}`)
    }

    return (
        <>
            <Form onSubmit={handleJoinRoom} id="form-join">
                <Form.Group controlId="roomCode">
                    <Form.Label style={{display: "block"}}>Room Code</Form.Label>
                    <div style={{display: "inline-flex", boxSizing: "border-box", width: "100%"}}>
                        <Form.Control type="name" placeholder="Enter the room code here..." onChange={handleChangeRoomCode}></Form.Control>
                        <Button onClick={handleClickedCamera}>QR</Button>
                    </div>
                </Form.Group>
                <Button onClick={handleJoinRoom} style={{boxSizing: "border-box", width: "100%"}}>Join Room</Button>
            </Form>
        </>
    );
}

export default JoinRoom;