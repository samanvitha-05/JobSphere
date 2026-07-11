import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import SavedJobs from "./pages/SavedJobs";
import MyApplications from "./pages/MyApplications";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/jobs"
                    element={<Jobs />}
                />

                <Route
                    path="/jobs/:id"
                    element={<JobDetails />}
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/dashboard"
                    element={
                        <ProtectedRoute role="student">
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/dashboard"
                    element={
                        <ProtectedRoute role="recruiter">
                            <RecruiterDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                path="/saved-jobs"
                element={
                <ProtectedRoute>
                  <SavedJobs />
                  </ProtectedRoute>
                }
                />

                <Route
                path="/my-applications"
                element={
                <ProtectedRoute>
                  <MyApplications />
                  </ProtectedRoute>
                }
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;