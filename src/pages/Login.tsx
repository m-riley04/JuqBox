import { Button, Form } from "react-bootstrap";

function Login() {
    return (
        <>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username"></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"></Form.Control>
                </Form.Group>

                <Button>Login</Button>
            </Form>
        </>
    );
}

export default Login;