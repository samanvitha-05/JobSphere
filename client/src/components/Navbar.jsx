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

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="me-auto">

                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>

                        <Nav.Link as={Link} to="/jobs">
                            Jobs
                        </Nav.Link>

                        {user?.role === "student" && (
                            <>
                                <Nav.Link as={Link} to="/saved-jobs">
                                    Saved Jobs
                                </Nav.Link>

                                <Nav.Link as={Link} to="/my-applications">
                                    My Applications
                                </Nav.Link>
                            </>
                        )}

                        {user?.role === "recruiter" && (
                            <>
                                <Nav.Link as={Link} to="/my-posted-jobs">
                                    My Jobs
                                </Nav.Link>

                                <Nav.Link as={Link} to="/recruiter/dashboard">
                                    Recruiter Dashboard
                                </Nav.Link>
                            </>
                        )}

                        {user?.role === "admin" && (
                            <Nav.Link as={Link} to="/admin/dashboard">
                                Admin Dashboard
                            </Nav.Link>
                        )}

                        {user?.role === "student" && (
                            <Nav.Link as={Link} to="/student/dashboard">
                                Student Dashboard
                            </Nav.Link>
                        )}

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
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>

                                <Navbar.Text className="mx-3">
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