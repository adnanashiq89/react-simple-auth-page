import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SignupUserPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    zipCode: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    const mainUrl = process.env.VITE_API_BASE_URL;
    const apiUrl = process.env.VITE_API_URL_SIGN_UP;

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
      await axios.request(config);
      setSuccessMessage("User account registered successfully.");
      setErrorMessage("");

      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Registration failed.");
        // setTimeout(() => , 1500);
      }
      setSuccessMessage("");
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate("/");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5">Create User Account</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              User Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:border-red-500"
              required
            />
          </div>
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
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="repeatPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="repeatPassword"
                id="repeatPassword"
                placeholder="Repeat Password"
                value={formData.repeatPassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:border-red-500"
                required
              />
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="zipCode"
            >
              Zip Code
            </label>
            <input
              type="number"
              name="zipCode"
              id="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:border-red-500"
              required
            />
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-500">
              {successMessage && (
                <p className="text-green-500">{successMessage}</p>
              )}
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </p>
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
                Processing...
              </>
            ) : (
              "Sign up"
            )}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-500">
            Already have an account?{" "}
            <button onClick={handleSignIn} className="text-red-500 font-bold">
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
