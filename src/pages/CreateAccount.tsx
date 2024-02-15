import { useState } from "react";
import { Button, Form } from "react-bootstrap";

function CreateAccount() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [confirmedEmail, setConfirmedEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    function handleCreateAccount() {

    }

    function handleChangedUsername(event) {
        setUsername(event.target.value);
        console.log(username)
    }

    function handleChangedEmail(event) {
        setEmail(event.target.value);
        if (email == confirmedEmail) {
            console.log("Match")
            event.target.style = { backgroundColor: "red"}
        }
        console.log(email)
    }

    function handleChangedConfirmedEmail(event) {
        setConfirmedEmail(event.target.value);
        console.log(confirmedEmail);
    }

    function handleChangedPassword(event) {
        setPassword(event.target.value);
        console.log(password)
    }

    function handleChangedConfirmedPassword(event) {
        setConfirmedPassword(event.target.value);
        console.log(confirmedPassword)
    }

    return (
        <>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" onChange={handleChangedUsername}></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={handleChangedEmail}></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmEmail">
                    <Form.Label>Confirm Email</Form.Label>
                    <Form.Control type="email" onChange={handleChangedConfirmedEmail}></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handleChangedPassword}></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" onChange={handleChangedConfirmedPassword}></Form.Control>
                </Form.Group>
            </Form>
            <Button onClick={handleCreateAccount}>Create Account</Button>
        </>
    );
}

export default CreateAccount;