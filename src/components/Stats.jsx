import {useEffect, useState} from "react";

export default function Stats({render, setRender, isDisabled, labId}) {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const [startNumber, setStartNumber] = useState(0);
    const [endNumber, setEndNumber] = useState(0);
    const [finished, setFinished] = useState();
    const [loading, setLoading] = useState(true);
    const [finishPosition, setFinishPosition] = useState(-1);

    async function successFetcher() {
        const data = await fetch(`${baseUrl}/api/verify/stats/?lab=${labId}`, {
            method: "GET", credentials: "include"
        });
        return await data.json();

    }

    useEffect(() => {
        successFetcher().then(response => {
            setStartNumber(response.Started);
            setEndNumber(response.Finished);
            setFinished(response.hasFinished);
            setFinishPosition(response.finishingPosition)
        })
    }, [render]);

    useEffect(() => {
        successFetcher().then(response => {
            setStartNumber(response.Started);
            setEndNumber(response.Finished);
            setFinished(response.hasFinished);
            setFinishPosition(response.finishingPosition)
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        const fetchData = () => {
            successFetcher().then(response => {
                setStartNumber(response.Started);
                setEndNumber(response.Finished);
                setFinished(response.hasFinished);
                setFinishPosition(response.finishingPosition)
            });
        };

        // Call immediately on mount
        fetchData();

        // Set interval to run every 5 minutes (300000 ms)
        const interval = setInterval(fetchData, 300000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    function ordinalSuffix(num) {
        const n = num % 100;
        if (n >= 11 && n <= 13) return "th";

        switch (num % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

    return (
        <>{!isDisabled ?
            <div>
                <div className="mt-4">
                    <span className="text-green-500 font-bold">People started:</span> {startNumber}
                </div>
                <div className="mb-4">
                    <span className="text-red-700 font-bold">People finished:</span> {endNumber}
                </div>
                <div className="mb-4">
                    {!loading ? (!finished ? (<span>
      You will be <span className="font-extrabold">
        {endNumber + 1}<sup>{ordinalSuffix(endNumber + 1)}</sup>
      </span> finisher
    </span>) : (<span>
      You finished <span className="font-extrabold">
        {finishPosition}<sup>{ordinalSuffix(finishPosition)}</sup>
      </span>
    </span>)) : null}

                </div>
            </div> : <p> This event has concluded please see leaderboard for results</p>}
        </>)
}