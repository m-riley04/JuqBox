import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.scss";

function NavigationBar() {
    return (
        <>
            <Navbar className="navbar">
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="">Home</Nav.Link>
                        <Nav.Link as={Link} to="host">Host</Nav.Link>
                        <Nav.Link as={Link} to="join">Join</Nav.Link>
                        <Nav.Link as={Link} to="spotify">Spotify</Nav.Link>
                    </Nav>
                    <Navbar.Brand as={Link} to="account" className="justify-content-end">
                        <img
                            src="" // TODO - Add image for account button
                            width="30"
                            height="30"
                            style={{color: "black"}}
                            alt="Account"
                        />
                    </Navbar.Brand>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavigationBar;