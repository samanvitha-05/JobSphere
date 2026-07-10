import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

            const res = await API.post("/auth/login", formData);

            localStorage.setItem("token", res.data.token);

            login(res.data.user);

            toast.success("Login Successful!");

            setTimeout(() => {

                navigate("/");

            }, 1200);

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Login Failed"
            );

        }

    };

    return (

        <MainLayout>

            <ToastContainer />

            <div
                className="container"
                style={{ maxWidth: "500px" }}
            >

                <div className="card shadow p-4 mt-5">

                    <h2 className="text-center mb-4">

                        Login

                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <button
                            className="btn btn-primary w-100"
                        >
                            Login
                        </button>

                    </form>

                    <p className="text-center mt-3">

                        Don't have an account?

                        <Link to="/register">
                            {" "}Register
                        </Link>

                    </p>

                </div>

            </div>

        </MainLayout>

    );

};

export default Login;