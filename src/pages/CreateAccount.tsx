import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { User } from "../../netlify/functions/users";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [confirmedEmail, setConfirmedEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChangedUsername(event) {
        setUsername(event.target.value);
    }

    function handleChangedEmail(event) {
        setEmail(event.target.value);
        if (event.target.value == confirmedEmail) {
            console.log("Emails now match")
        }
    }

    function handleChangedConfirmedEmail(event) {
        setConfirmedEmail(event.target.value);
        if (event.target.value == email) {
            console.log("Emails now match")
        }
    }

    function handleChangedPassword(event) {
        setPassword(event.target.value);
    }

    function addUser(user: User) {
        const body = JSON.stringify({
            values: user
        })
        fetch('/.netlify/functions/users/addUser', {
            method: 'POST',
            body
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not okay");
            }
            console.log("User added successfully!");
        })
        .catch(error => {
            console.error(error);
        })
    }

    async function isUsernameTaken(username: string) {
        console.log("Checking username...");

        try {
            const response = await fetch(`/.netlify/functions/users/checkUserUsername/${username}`, { method: 'GET' })
            const result = await response.json();

            if (result.rows.length > 0) {
                return true;
            }
            return false;

        } catch (error) {
            console.error(`Unable to check username: ${error}`);
            return true;
        }
    }

    async function isEmailTaken(email: string) {
        console.log("Checking email...");

        try {
            const response = await fetch(`/.netlify/functions/users/checkUserEmail/${email}`, { method: 'GET' })
            const result = await response.json();

            if (result.rows.length > 0) {
                return true;
            }
            return false;

        } catch (error) {
            console.error(`Unable to check email: ${error}`);
            return true;
        }
    }

    async function getNewUserId() {
        console.log("Getting new user ID...");
        
        try {
            const response = (await fetch(`/.netlify/functions/users/getUserCount`, { method: "GET" } ));
            const result = await response.json();

            return (Number(result.rows[0]["count(*)"]) + 1);
        } catch (error) {
            console.error(`Unable to get new user id: ${error}`);
            return 0;
        }
    }

    async function handleAddUser() {
        const usernameTaken = await isUsernameTaken(username);
        const emailTaken = await isEmailTaken(email);
        const id = await getNewUserId();

        // Check if both are taken
        if (usernameTaken && emailTaken) {
            console.warn("Username and email are already in use.");
            return;
        }

        // Check if the username is taken
        if (usernameTaken) {
            console.warn("Username has already been taken.")
            return;
        }

        // Check if the email is taken
        if (emailTaken) {
            console.warn("Email is already being used on another account.")
            return;
        }

        // If the checks pass, add the user to the database
        addUser({
            id: id,
            username: username,
            email: email,
            password_hash: password
        });

        // Redirect to home page
        navigate("../")
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
                <Button onClick={handleAddUser}>Create Account</Button>
            </Form>
            
        </>
    );
}

export default CreateAccount;