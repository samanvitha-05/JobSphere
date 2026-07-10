import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

import { AuthContext } from "../context/AuthContext";

const NavigationBar = () => {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <Navbar bg="dark" variant="dark" expand="lg">

            <Container>

                <Navbar.Brand as={Link} to="/">
                    JobSphere
                </Navbar.Brand>

                <Navbar.Toggle />

                <Navbar.Collapse>

                    <Nav className="me-auto">

                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>

                        <Nav.Link as={Link} to="/jobs">
                            Jobs
                        </Nav.Link>

                    </Nav>

                    <Nav>

                        {!user ? (

                            <>

                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>

                                <Nav.Link as={Link} to="/register">
                                    Register
                                </Nav.Link>

                            </>

                        ) : (

                            <>

                                <Navbar.Text className="me-3">

                                    Welcome, {user.name}

                                </Navbar.Text>

                                <Button
                                    variant="outline-light"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>

                            </>

                        )}

                    </Nav>

                </Navbar.Collapse>

            </Container>

        </Navbar>

    );

};

export default NavigationBar;