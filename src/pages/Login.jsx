import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import api from '../utils/axios';
import { loginSuccess } from "../features/auth.js";
import { useDispatch } from "react-redux";
import BackButton from "../components/buttons/Back.jsx";
import Error from "../components/error/ErrorMessage.jsx";
import ErrorMessage from "../components/error/ErrorMessage.jsx";
import { Helmet } from "react-helmet-async";

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null); // For managing field errors

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors on attempt

    try {
      
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const data = await response.data?.data;

      if (!data.access_token) {
        throw new Error("Login failed");
      }

      dispatch(
        loginSuccess({
          user: data.user,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        })
      );
      const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");
      if (redirectAfterLogin) {
        localStorage.removeItem("redirectAfterLogin"); // Important to avoid repeated redirects
        window.location.href = redirectAfterLogin;
      } else {
        window.location.href = "/messages";
      }

    } catch (error) {   
        setErrors(error.response.data.message);

    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Sarahah</title>
        <meta name="description" content="Log in to Sarahah app and start receiving anonymous messages." />
        <meta property="og:title" content="Login | Sarahah" />
        <meta property="og:description" content="Log in to Sarahah app and start receiving anonymous messages." />
      </Helmet>
      <div className="w-full px-[5%] h-full flex flex-col justify-center items-center gap-5">
        <BackButton url='/' />
        <FaRegCircleUser className="text-5xl text-white" />
        <h2 className="text-2xl font-bold text-green-500">Login</h2>
        <form className="w-full max-w-80 border p-5 rounded-lg flex flex-col items-center gap-3 " onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="w-full">
            <input
              className={`w-full border-b-2 outline-none ps-3 ${errors ? "border-red-500" : ""}`}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password field */}
          <div className="w-full">
            <input
              className={`w-full border-b-2 outline-none ps-3 ${errors ? "border-red-500" : ""}`}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login button */}
          <button type="submit" className="mb-3 h-8 px-3 rounded-lg bg-green-500 text-white font-bold text-lg w-fit">
            Login
          </button>

          {/* Additional links */}
          <p className="w-full flex justify-between text-sm text-gray-500">
            <Link to={"/forget-password"} className="hover:scale-105 hover:text-gray-300 duration-200">Forgot Password?</Link> 
            <Link className="text-black font-bold bg-gray-300 hover:text-white duration-200 border px-2 py-1 rounded-lg border-white hover:bg-red-500" to="/register">Register</Link>
          </p>
        </form>
        {
          errors && <ErrorMessage err={errors} />
        }
      </div>
    </>
  );
}
