import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/auth/register", formData);

            toast.success(res.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Registration Failed"
            );

        }

    };

    return (

        <MainLayout>

            <ToastContainer />

            <div
                className="container"
                style={{ maxWidth: "550px" }}
            >

                <div className="card shadow p-4 mt-5">

                    <h2 className="text-center mb-4">
                        Register
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Name</label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Email</label>

                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Role</label>

                            <select
                                className="form-select"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="student">
                                    Student
                                </option>

                                <option value="recruiter">
                                    Recruiter
                                </option>

                                <option value="admin">
                                    Admin
                                </option>

                            </select>

                        </div>

                        <button
                            className="btn btn-success w-100"
                        >
                            Register
                        </button>

                    </form>

                    <p className="text-center mt-3">

                        Already have an account?

                        <Link to="/login">
                            {" "}Login
                        </Link>

                    </p>

                </div>

            </div>

        </MainLayout>

    );

};

export default Register;