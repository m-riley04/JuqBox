import { Button, Form } from "react-bootstrap";

function CreateAccount() {
    function handleCreateAccount() {

    }
    
    return (
        <>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username"></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email"></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmEmail">
                    <Form.Label>Confirm Email</Form.Label>
                    <Form.Control type="email"></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password"></Form.Control>
                </Form.Group>
            </Form>
            <Button onClick={handleCreateAccount}>Create Account</Button>
        </>
    );
}

export default CreateAccount;