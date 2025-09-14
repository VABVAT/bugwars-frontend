import StartButton from "./StartButton.jsx";
import Stats from "./Stats.jsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterButton from "./RegisterButton.jsx";
import Timer from "./Timer.jsx";


const ProblemStatement = ({
                              heading,
                              info,
                              details,
                              imgIfAny,
                              alt = "",
                              notIfAny,
                              isDisabled,
                              labId,
                              startsAt = null,
                                statsDisabled,
                              leaderboard// new prop: accepts Date | number | ISO string,
                          }) => {
    const navigate = useNavigate();

    const [render, setRender] = useState(0);

    return (
        <div className="font-serif text-[#222]">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Left */}
                <div className="md:w-3/5 w-full">
                    <h3 className="text-lg font-semibold mb-2">{heading}</h3>
                    <div className="text-sm text-gray-800">{info}</div>
                    {details && <div className="text-xs font-semibold mt-2">{details}</div>}

                    {/* Timer (classic) */}

                </div>

                {/* Right */}
                <div className="md:w-2/5 w-full flex flex-col items-stretch">
                    <div className="relative group inline-block">
                        <button
                            disabled={leaderboard}
                            onClick={() => navigate(`/leaderboard?lab=${labId}`)}
                            className={`text-sm font-medium px-3 py-1 mb-3 border rounded focus:outline-none transition ${
                                leaderboard
                                    ? "bg-gray-100 text-gray-500 border-gray-200 cursor-not-allowed"
                                    : "bg-white text-black border-gray-400 hover:bg-black hover:text-white"
                            }`}
                            aria-disabled={leaderboard}
                        >
                            Leaderboard
                        </button>

                        {leaderboard && (
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 shadow">
      Leaderboard will be enabled by 12 AM
    </span>
                        )}
                    </div>

                    {imgIfAny ? (
                        <div className="flex-1 flex items-center justify-center">
                            <img src={imgIfAny} alt={alt} className="max-h-44 w-auto object-contain" />
                        </div>
                    ) : (
                        <div className="h-24" />
                    )}
                </div>
            </div>

            <div className="mt-4 mb-2 md:flex-row md:items-center gap-3">
                {isDisabled ? (
                    <RegisterButton labId={labId} render={render} setRender={setRender} />

                ) : (
                    <>
                        <div>
                            <StartButton
                                isDisabled={isDisabled}
                                labNumber={labId}
                                render={render}
                                setRender={setRender}
                            />
                        </div>
                    </>
                )}
                <div className="flex-1">
                    {statsDisabled == true ? null :
                    <Stats isDisabled={statsDisabled} labId={labId} render={render} setRender={setRender} />
                    }
                </div>
            </div>
            <Timer startsAt={startsAt} />
            {notIfAny && <div className="mt-3 text-sm text-gray-700">{notIfAny}</div>}
        </div>
    );
};

export default ProblemStatement;
