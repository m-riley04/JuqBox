import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { doesRoomExist } from "../server/roomRequests";
import { QrReader } from "react-qr-reader";

function JoinRoom() {
    const navigate = useNavigate();
    
    const [code, setCode] = useState(100000000);
    const [showScanner, setShowScanner] = useState(false);
    
    function handleChangeRoomCode(event: ChangeEvent<HTMLInputElement>){
        setCode(Number(event.target.value));
    }

    function handleOpenCamera() {
        console.log("Opening camera for QR code...")
        setShowScanner(true)
    }
    
    function handleCloseCamera() {
        setShowScanner(false)
        window.location.reload();
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
            <Modal show={showScanner}>
                <Modal.Header closeButton>
                    <Modal.Title>Scan Code</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <QrReader
                        onResult={(result, error) => {
                            if (result) {
                                //
                            }

                            if (error) {
                                console.info(error);
                            }
                        }}
                    />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCamera}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Form onSubmit={handleJoinRoom} id="form-join">
                <Form.Group controlId="roomCode">
                    <Form.Label style={{display: "block"}}>Room Code</Form.Label>
                    <div style={{display: "inline-flex", boxSizing: "border-box", width: "100%"}}>
                        <Form.Control type="name" placeholder="Enter the room code here..." onChange={handleChangeRoomCode}></Form.Control>
                        <Button onClick={handleOpenCamera} >QR</Button>
                    </div>
                </Form.Group>
                <Button onClick={handleJoinRoom} style={{boxSizing: "border-box", width: "100%"}}>Join Room</Button>
            </Form>
        </>
    );
}

export default JoinRoom;