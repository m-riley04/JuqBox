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
            <button onClick={handleClickedHost}>Host</button>
            <button onClick={handleClickedJoin}>Join</button>
        </>
    );
}

export default Home;