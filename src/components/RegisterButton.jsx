import React, { useState } from "react";
import "../index.css";

const RegisterButton = ({isDisabled}) => {
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleRegister = async () => {
        try {
            const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
            const res = await fetch(`${baseUrl}/api/register`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}),
            });

            const data = await res.json();

            setMessage(data.message);
            setIsError(data.error);
        } catch (err) {
            setMessage("Something went wrong!");
            setIsError(true);
        }
    };

    return (
        <div className="font-serif">
            {/* Classic button */}
            <button
                disabled={isDisabled}
                onClick={handleRegister}
                className={`px-4 py-1 mt-3 border border-black text-sm font-semibold focus:outline-none
                                ${
                    isDisabled
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gray-100 text-black hover:bg-black hover:text-white"
                }`}
            >
                Register
            </button>

            {/* Message box */}
            {message && (
                <div
                    className={`mt-2 px-3 py-2 border text-sm font-semibold ${
                        isError
                            ? "border-red-600 text-red-700 bg-red-50"
                            : "border-green-600 text-green-700 bg-green-50"
                    }`}
                >
                    <div className="flex justify-between items-center">
                        <span>{message}</span>
                        <button
                            onClick={() => setMessage("")}
                            className="ml-3 text-black hover:text-red-600"
                            aria-label="Close message"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterButton;
