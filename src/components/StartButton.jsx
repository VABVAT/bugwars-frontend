import React, { useState } from "react";
import "../index.css";

const StartButton = ({render, setRender, isDisabled, labNumber}) => {

    const [value, setValue] = useState("");
    const [started, setStarted] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmission() {
        const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
        setError("");
        setSuccess(false);

        const data = await fetch(`${baseUrl}/api/verify/?lab=${labNumber}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ answer: value }),
        });
        const response = await data.json();
        if(!data.ok) {
            setError(response.error);
        }else{
            if(response.success == true) {
                setSuccess(true);
                setError("You did it.... Congratulations!");
            }else{
                setError("Incorrect answer");
            }
        }
        setRender(prev => prev + 1);
    }

    async function handleLabStart(){
            const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
            await fetch(`${baseUrl}/api/register/start`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lab: labNumber
                }),
            });
            setStarted(true);
            setRender(prev => prev + 1);
            if(labNumber == 1){
                window.open("https://flab.bugwars.in", "_blank");
            }

    }

    return (
        <div className="font-serif">
            {/* Classic button */}
            <button
                disabled={isDisabled}
                onClick={handleLabStart}
                className={`px-4 py-1 mt-3 border border-black text-sm font-semibold focus:outline-none
                                ${
                    isDisabled
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-gray-100 text-black hover:bg-black hover:text-white"
                }`}
            >
                Start lab
            </button>

            {/* Message box */}
            {(
                <div className="mt-4 space-x-2">
                    <input
                        type="text"
                        placeholder="Enter the secret received from lab"
                        onChange={(e) => setValue(e.target.value)}
                        className="px-3 py-1 border border-black bg-gray-50 text-sm text-black focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-500"
                    />
                    <button
                        disabled={isDisabled}
                        onClick={handleSubmission}
                        className={`px-4 py-1 mt-3 border border-black text-sm font-semibold focus:outline-none
                                ${
                            isDisabled
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-gray-100 text-black hover:bg-black hover:text-white"
                        }`}
                    >
                        Submit
                    </button>
                </div>
            )}
            {error === "" ? null :   <div className="mt-2 flex justify-between items-center">
                <span className={`${success ? "text-green-500" : "text-red-700"} font-bold`} > {error} </span>
                <button
                    onClick={() => setError("")}
                    className=" ml-3 text-black p-2 hover:text-red-600"
                    aria-label="Close message"
                >
                    ✕
                </button>

            </div>}
        </div>
    );
};

export default StartButton;
