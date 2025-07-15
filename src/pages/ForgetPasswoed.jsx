import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from '../utils/axios';
import { Helmet } from "react-helmet-async";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [next, setNext] = useState(false);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setError("The password and confirmation password do not match.❌");
      setSuccess("");
    } else if (confirmPassword && password === confirmPassword) {
      setSuccess("The password and confirmation password are identical.✅");
      setError("");
    } else {
      setSuccess("");
      setError("");
    }
  }, [password, confirmPassword]);

  const sendEmail = async () => {
    setError("");
    setMessage("");

    try {
      const response = await api.post(`/auth/forget-password`, { email });
      setMessage(response.data.message || "Password reset link has been sent to your email.");
      setNext(true);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while sending the request.");
    }
  };

  const changePassword = async () => {
    setError("");
    setMessage("");

    if (!otp) return setError("OTP is required.");
    if (!password || !confirmPassword) return setError("Please enter a new password.");

    try {
      const response = await api.post(`/auth/reset-password`, { email, otp, password, confirmPassword });
      setMessage(response.data.message || "Password changed successfully.");
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while changing the password.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | Sarahah</title>
        <meta name="description" content="Recover your password in Sarahah app easily via email." />
        <meta property="og:title" content="Forgot Password | Sarahah" />
        <meta property="og:description" content="Recover your password in Sarahah app easily via email." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-slate-800">
        <div className="w-full max-w-md p-6 bg-gray-300 border rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Forget Password
          </h2>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label htmlFor="email" className="block ps-1 font-bold text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="your email"
              />
            </div>

            {!next ? (
              <>
                <button
                  type="button"
                  onClick={sendEmail}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Send a password reset link
                </button>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 flex justify-between px-[5%]">
                    <span>Remember password?</span>
                    <Link
                      className="text-black font-bold bg-gray-300 hover:text-white duration-200 border px-2 py-1 rounded-lg border-white hover:bg-red-500"
                      to="/login"
                    >
                      Login
                    </Link>
                  </p>
                </div>
                {message && <p className="text-center text-green-500 mb-4">{message}</p>}
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="otp" className="block ps-1 font-bold text-gray-600">
                    OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="OTP"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block ps-1 font-bold text-gray-600">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="New Password"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block ps-1 font-bold text-gray-600">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-indigo-500"
                    }`}
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="flex justify-between items-center px-[5%]">
                  <button
                    type="button"
                    onClick={changePassword}
                    className="w-fit px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Change Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setNext(false)}
                    className="w-fit px-4 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Prev
                  </button>
                </div>

                {success && <p className="text-center text-green-500 mb-4">{success}</p>}
                {error && <p className="text-center text-red-500 mb-4">{error}</p>}
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
