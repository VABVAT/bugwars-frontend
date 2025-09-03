import React, { useState } from "react";
import '../index.css'

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
                className="transition-all duration-500 p-1 bg-gray-300 mt-3 w-[100px] rounded-lg hover:bg-gray-800 hover:text-white focus:outline-none focus:shadow-outline"
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
                        onClick={() => {setMessage("")}}
                        className=" ml-3 text-gray-400 hover:text-gray-700 transition"
                        aria-label="Close message"
                        style={{ background: "transparent", border: "none", cursor: "pointer" }}
                    >

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 8.586L4.293 2.879A1 1 0 102.879 4.293L8.586 10l-5.707 5.707a1 1 0 101.414 1.414L10 11.414l5.707 5.707a1 1 0 001.414-1.414L11.414 10l5.707-5.707a1 1 0 00-1.414-1.414L10 8.586z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default RegisterButton;
