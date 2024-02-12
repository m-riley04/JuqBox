import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

function Home() {
    const navigate = useNavigate();

    /** Handles when the user clicks 'host' */
    function handleClickedHost() {
        navigate("host");
    }

    /** Handles when the user clicks 'join' */
    function handleClickedJoin() {
        navigate("join");
    }
    return (
        <>
            <img alt="record image"/>
            <h1>JuqBox</h1>
            <p>You control the queue.</p>
            <Button onClick={handleClickedHost}>Host</Button>
            <Button onClick={handleClickedJoin}>Join</Button>
        </>
    );
}

export default Home;