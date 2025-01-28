import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SelectUserType = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(false); // State for button loading
  const navigate = useNavigate();

  const handleSelection = (type) => {
    // Toggle selection: if the same type is clicked again, deselect it
    if (selectedType === type) {
      setSelectedType(null);
    } else {
      setSelectedType(type);
    }
  };

  const handleNext = () => {
    if (!selectedType) return;

    setLoading(true); // Start loading state

    if (selectedType === "User") {
      navigate("/signup-user");
    } else if (selectedType === "Business") {
      navigate("/signup-business");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-5">Select User Type</h2>
      <div className="flex justify-center gap-5 mb-8">
        <button
          className={`flex flex-col items-center justify-center p-5 border-2 rounded-lg w-28 h-28 transition-all duration-300 cursor-pointer 
            ${
              selectedType === "User"
                ? "border-red-500 bg-red-100"
                : "border-gray-300"
            }
            hover:border-red-500 hover:bg-red-50`}
          onClick={() => handleSelection("User")}
        >
          <div className="text-4xl mb-2">👤</div>
          <span className="text-lg">User</span>
        </button>
        <button
          className={`flex flex-col items-center justify-center p-5 border-2 rounded-lg w-28 h-28 transition-all duration-300 cursor-pointer
            ${
              selectedType === "Business"
                ? "border-red-500 bg-red-100"
                : "border-gray-300"
            }
            hover:border-red-500 hover:bg-red-50`}
          onClick={() => handleSelection("Business")}
        >
          <div className="text-4xl mb-2">💼</div>
          <span className="text-lg">Business</span>
        </button>
      </div>
      <button
        className={`py-3 px-16 rounded-full text-lg flex items-center justify-center ${
          selectedType
            ? loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-red-500 text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handleNext}
        disabled={!selectedType || loading} // Disable button if no type is selected or loading
        style={{ minWidth: "150px" }} // Set a minimum width for the button
      >
        {loading ? (
          <div className="flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
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
            <span>Loading...</span>
          </div>
        ) : (
          "Next"
        )}
      </button>
    </div>
  );
};
