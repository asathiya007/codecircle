import React from 'react'; 
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Navigation = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Navbar.Brand className="f3 fw7 ml4" href="/">
                    <span className="blue-hover">
                        <i className="fas fa-code"></i> CodeCircle
                    </span>
                </Navbar.Brand>
                <Nav className="ml-auto mr4">
                    <Nav.Link href="/register" className="text-white">
                        <span className="blue-hover">
                            Register
                        </span>
                    </Nav.Link>
                    <Nav.Link href="/login" className="text-white">
                        <span className="blue-hover">
                            Log In
                        </span>
                    </Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Navigation; 
