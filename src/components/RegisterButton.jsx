import React, { useState } from "react";

const RegisterButton = () => {
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
        <div>
            <button
                onClick={handleRegister}
                className="p-2 bg-blue-500 text-white rounded"
            >
                Register
            </button>

            {message && (
                <div
                    className={`mt-2 px-4 py-2 rounded flex items-center justify-between shadow-md ${
                        isError ? "text-red-700 font-semibold bg-red-50" : "text-green-700 font-semibold bg-green-50"
                    }`}
                >
                    <span>{message}</span>
                    <button
                        onClick={() => setMessage("")}
                        className="ml-3 text-gray-400 hover:text-gray-700 transition"
                        aria-label="Close"
                    >
                        Hide
                    </button>
                </div>
            )}
        </div>
    );
};

export default RegisterButton;
