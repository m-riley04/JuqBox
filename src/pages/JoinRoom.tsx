import { Button, Form } from "react-bootstrap";

function JoinRoom() {
    function handleChangeRoomCode() {

    }

    function handleClickedCamera() {
        console.log("Opening camera for QR code...")
    }

    function handleJoinRoom(event?) {
        // Stop page refreshing
        event?.preventDefault();

        console.log("Attempting to join room...")
    }

    return (
        <>
            <Form onSubmit={handleJoinRoom}>
                <Form.Group controlId="roomCode">
                    <Form.Label>Room Code</Form.Label>  
                    <Form.Control type="name" placeholder="Enter the room code here..." onChange={handleChangeRoomCode}></Form.Control>
                    <Button onClick={handleClickedCamera}>QR</Button>
                </Form.Group>
            </Form>

            <Button onClick={handleJoinRoom}>Join Room</Button>
        </>
    );
}

export default JoinRoom;