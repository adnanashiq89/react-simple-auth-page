import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const NewPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    repeatPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable button and show loading state
    setErrorMessage(""); // Clear any previous error messages
    setSuccessMessage(""); // Clear previous success message

    if (formData.password !== formData.repeatPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);

      return;
    }

    const email = localStorage.getItem("email");
    const otp = localStorage.getItem("otp");

    const data = JSON.stringify({
      email: email,
      otp: otp,
      ...formData,
    });

    const mainUrl = process.env.VITE_API_BASE_URL;
    const apiUrl = process.env.VITE_API_URL_RESET;

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${mainUrl}${apiUrl}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      await axios.request(config);

      setSuccessMessage("Password created successfully.");

      setErrorMessage("");

      navigate("/");
    } catch (error) {
      console.log(error);

      setErrorMessage("Failed to create password. Please try again.");

      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5">Create New Password</h2>
        <form onSubmit={handleSendEmail}>
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
                onChange={handlePasswordChange}
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
                type={showPassword ? "text" : "password"}
                name="repeatPassword"
                id="repeatPassword"
                placeholder="Repeat Password"
                value={formData.repeatPassword}
                onChange={handlePasswordChange}
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
          <div className="text-center mb-4">
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
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
                Changing...
              </>
            ) : (
              "Change"
            )}
          </button>
        </form>
        <button
          onClick={handleCancel}
          className="w-full py-3 border border-gray-300 rounded-full text-lg mt-6"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
