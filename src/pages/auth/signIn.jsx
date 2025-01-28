import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgetPassword = () => {
    navigate("/forgot-password");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const mainUrl = process.env.VITE_API_BASE_URL;
    const apiUrl = process.env.VITE_API_URL_SIGN_IN;

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${mainUrl}${apiUrl}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(formData),
    };

    try {
      const response = await axios.request(config);
      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      location.href = "/";
      setLoading(false);
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate("/select-user");
  };

  const homePage = () => {
    navigate("/home-p");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div
        onClick={homePage}
        className="text-end w-2/5 mt-7 text-red-400 cursor-pointer"
      >
        Skip
      </div>
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="xyz@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:border-red-500"
                required
              />

              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-sm text-gray-500"
              >
                Forget Password
              </button>
            </div>
          </div>

          <div className="text-center">
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-full text-lg mt-6 flex items-center justify-center ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-500 text-white"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                  ></path>
                </svg>
                Signin...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-500">
            Don’t have an account?{" "}
            <button onClick={handleSignUp} className="text-red-500 font-bold">
              Sign up!
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
