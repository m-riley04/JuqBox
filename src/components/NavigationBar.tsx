import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
    return (
        <>
            <Navbar>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="">Home</Nav.Link>
                        <Nav.Link as={Link} to="host">Host</Nav.Link>
                        <Nav.Link as={Link} to="join">Join</Nav.Link>
                        <Nav.Link as={Link} to="account">Account</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavigationBar;