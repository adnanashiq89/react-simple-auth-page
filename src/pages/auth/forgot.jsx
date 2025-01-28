import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const data = JSON.stringify(formData);

    const mainUrl = process.env.VITE_API_BASE_URL;
    const apiUrl = process.env.VITE_API_URL_FORGET;

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
      const response = await axios.request(config);
      const otp = response.data.otp;
      const email = response.data.email;
      localStorage.setItem("otp", otp);
      localStorage.setItem("email", email);

      setSuccessMessage("OTP sent to your account.");

      navigate("/verify-otp");
    } catch (error) {
      setErrorMessage("Failed to send email. Please try again.");

      console.log(error);

      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5">Reset Password</h2>
        <form onSubmit={handleSendEmail}>
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
              onChange={handleEmailChange}
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
                Sending...
              </>
            ) : (
              "Send email"
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
