import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function Account() {
    const navigate = useNavigate();

    function handleLogin() {
        navigate("../login");
    }

    function handleCreateAccount() {
        navigate("../create-account");
    }

    return (
        <>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleCreateAccount}>Create Account</Button>
        </>
    );
}

export default Account;