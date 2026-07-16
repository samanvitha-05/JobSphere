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
import MyPostedJobs from "./pages/MyPostedJobs";
import Applicants from "./pages/Applicants";
import ProtectedRoute from "./components/ProtectedRoute";
import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";

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
                    path="/post-job"
                    element={
                        <ProtectedRoute role="recruiter">
                            <PostJob />
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
                    path="/applicants/:jobId"
                    element={
                        <ProtectedRoute role="recruiter">
                            <Applicants />
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
                path="/my-posted-jobs"
                element={
                <ProtectedRoute role="recruiter">
                  <MyPostedJobs />
                  </ProtectedRoute>
                }
                />

                <Route
                path="/edit-job/:id"
                element={
                <ProtectedRoute role="recruiter">
                    <EditJob />
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