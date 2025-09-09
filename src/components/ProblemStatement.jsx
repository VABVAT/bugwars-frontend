import StartButton from "./StartButton.jsx";
import Stats from "./Stats.jsx";
import React, {useState} from "react";

const ProblemStatement = ({heading, info, details, imgIfAny, alt, notIfAny}) => {
    const [render, setRender] = useState(0);
    return (
        <>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-3/5 w-full space-y-3">
                    <h3 className="text-lg font-bold mb-2">{heading}</h3>
                    <div>
                        {info}
                    </div>
                    {details && <p className="text-xs font-bold">{details}</p>}
                </div>
                <div className="md:w-2/5 w-full flex items-center justify-center">
                    <img
                        src={imgIfAny}
                        alt={alt}
                        className="w-[90%] max-h-52 object-contain"
                    />
                </div>
            </div>
            <div className="mt-4 mb-4">
                <StartButton render={render} setRender={setRender}/>
            </div>
            <Stats render={render} setRender={setRender} />
            {notIfAny}
        </>);
};

export default ProblemStatement;
