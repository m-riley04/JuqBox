import { useNavigate } from "react-router";
import record from "../../assets/juqbox_record.svg";

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
        <div id="home" className="container row">
            <img alt="record image" src={record} id="record" className="rotating col-md-3"/>
            <div id="title-container" className="col-md-6">
                <h1>JuqBox</h1>
                <p>You control the queue.</p>
                <div className="buttonRow">
                    <button onClick={handleClickedHost}>Host</button>
                    <button onClick={handleClickedJoin}>Join</button>
                </div>
            </div>
        </div>
    );
}

export default Home;