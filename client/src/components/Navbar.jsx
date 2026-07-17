import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const NavigationBar = () => {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const [notificationCount, setNotificationCount] = useState(0);

    const handleLogout = () => {

        logout();
        navigate("/login");

    };

    const fetchNotifications = async () => {

    try {

        const res = await API.get("/notifications");

        const unread = res.data.notifications.filter(
            (notification) => !notification.read
        );

        setNotificationCount(unread.length);

    } catch (error) {

        console.log(error);

    }

};

useEffect(() => {

    if (user) {

        fetchNotifications();

    }

}, [user]);


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

                                <Nav.Link as={Link} to="/student/dashboard">
                                    Student Dashboard
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

                    </Nav>

                    <Nav className="align-items-center">

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
                                <Nav.Link
                                as={Link}
                                to="/notifications"
                                >
                                    🔔 Notifications
                                    {notificationCount > 0 && (
                                        <span
                                        className="badge bg-danger ms-2"
                                        >
                                            {notificationCount}
                                            </span>
                                        )}

                                </Nav.Link>

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