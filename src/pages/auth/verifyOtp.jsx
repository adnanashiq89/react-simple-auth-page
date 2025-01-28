import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const VerifyOtp = () => {
  const [formData, setFormData] = useState({ otp: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); // Disable button and show loading state
    setErrorMessage("");
    setSuccessMessage("");

    const storedOtp = localStorage.getItem("otp");

    if (formData.otp === storedOtp) {
      setSuccessMessage("OTP is verified successfully.");

      setErrorMessage("");

      navigate("/new-password");
    } else {
      setErrorMessage("Wrong OTP. Please try again.");

      setSuccessMessage("");

      setLoading(false); // Re-enable button after showing error message
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5">Verify OTP</h2>
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="otp"
            >
              OTP
            </label>
            <input
              type="number"
              name="otp"
              id="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleOtpChange}
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:border-red-500"
              required
            />
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
                Verifying...
              </>
            ) : (
              "Verify"
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
