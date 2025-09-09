import StartButton from "./StartButton.jsx";
import Stats from "./Stats.jsx";
import React, { useState } from "react";

const ProblemStatement = ({ heading, info, details, imgIfAny, alt, notIfAny, isDisabled }) => {
    const [render, setRender] = useState(0);

    return (
        <>
            <div className="flex flex-col md:flex-row gap-4">
                {/* Left column */}
                <div className="md:w-3/5 w-full space-y-3">
                    <div className="flex">
                        <h3 className="text-lg font-bold mb-2">{heading}</h3>
                    </div>
                    <div>{info}</div>
                    {details && <p className="text-xs font-bold">{details}</p>}
                </div>

                {/* Right column */}
                <div className="md:w-2/5 w-full flex flex-col">
                    {/* Leaderboard button at top */}
                    <div className="mb-2">
                        <button
                            disabled={isDisabled}
                            className={`px-4 py-1 mt-3 border border-black text-sm font-semibold focus:outline-none
                                ${
                                isDisabled
                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    : "bg-gray-100 text-black hover:bg-black hover:text-white"
                            }`}
                        >
                            Leaderboard
                        </button>
                    </div>

                    {/* Image centered */}
                    <div className="flex-1 flex items-center justify-center">
                        <img
                            src={imgIfAny}
                            alt={alt}
                            className="w-[90%] max-h-52 object-contain"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4 mb-4">
                <StartButton render={render} setRender={setRender} isDisabled={isDisabled} />
            </div>
            <Stats render={render} setRender={setRender} isDisabled={isDisabled} />
            {notIfAny}
        </>
    );
};

export default ProblemStatement;
