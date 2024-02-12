import { Button, Form } from "react-bootstrap";

function HostRoom() {
    function handleNameChange() {

    }

    function handleCodeChange() {

    }

    function handleMaxGuestsChange() {

    }

    function handleMaxConcurrentQueuesChange() {

    }

    function handleCostPerQueueChange() {

    }

    function handleClickedStartHosting() {

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

                <Form.Group controlId="roomCode">
                    <Form.Label>Room Code</Form.Label>
                    <Form.Control 
                        type="password"
                        //defaultValue="room-code-123"
                        onChange={handleCodeChange}
                        placeholder="room-code-123"
                    />
                </Form.Group>
                <Form.Group controlId="maxGuests">
                    <Form.Label>Maximum Guests</Form.Label>
                    <Form.Range min={1} max={999} value={100} onChange={handleMaxGuestsChange}></Form.Range>
                </Form.Group>

                <Form.Group controlId="maxCocurrentQueues">
                    <Form.Label>Maximum Concurrent Queues</Form.Label>
                    <Form.Range min={1} max={50} value={10} onChange={handleMaxConcurrentQueuesChange}></Form.Range>
                </Form.Group>

                <Form.Group controlId="costPerQueue">
                    <Form.Label>Cost Per Queue</Form.Label>
                    <Form.Range min={0} max={5} value={0} onChange={handleCostPerQueueChange}></Form.Range>
                </Form.Group>
            </Form>

            <Button onClick={handleClickedStartHosting}>Start hosting</Button>
        </>
    );
}

export default HostRoom;