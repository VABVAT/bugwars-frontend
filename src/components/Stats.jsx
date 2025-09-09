import {useEffect, useState} from "react";

export default function Stats({render, setRender, isDisabled, labId}) {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const [startNumber, setStartNumber] = useState(0);
    const [endNumber, setEndNumber] = useState(0);
    const [finished, setFinished] = useState();
    const [loading, setLoading] = useState(true);
    const [finishPosition, setFinishPosition] = useState(-1);
    const [regn, setRegn] = useState(0);
    async function successFetcher() {
        const data = await fetch(`${baseUrl}/api/verify/stats/?lab=${labId}`, {
            method: "GET", credentials: "include"
        });
        return await data.json();

    }
    async function registerFetcher() {
        const data = await fetch(`${baseUrl}/api/verify/registrations/?lab=${labId}`, {
            method: "GET", credentials: "include"
        });
        return await data.json();
    }
    // console.log(typeof isDisabled);
    useEffect(() => {
        successFetcher().then(response => {
            setStartNumber(response.Started);
            setEndNumber(response.Finished);
            setFinished(response.hasFinished);
            setFinishPosition(response.finishingPosition)
        })
        registerFetcher().then(response => {
            setRegn(response.registered)
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
        registerFetcher().then(response => {
            setRegn(response.registered)
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

        const fetchRegistered =  () => {
            registerFetcher().then(response => {
                setRegn(response.registered)
            })
        }

        // Call immediately on mount
        fetchData();
        fetchRegistered();
        // Set interval to run every 5 minutes (300000 ms)
        const interval = setInterval(fetchData, 300000);
        const interval2 = setInterval(fetchRegistered, 300000);
        // Cleanup interval on unmount
        return () => {
            clearInterval(interval);
            clearInterval(interval2);
        }
        
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
        <>
            {isDisabled ? (
                <div><b>Total registrations:</b> {regn ?? 0}</div>
            ) : (
                <div>
                    <div className="mt-4">
                        <span className="text-green-500 font-bold">People started:</span> {startNumber ?? 0}
                    </div>

                    <div className="mb-4">
                        <span className="text-red-700 font-bold">People finished:</span> {endNumber ?? 0}
                    </div>

                    <div className="mb-4">
                        {!loading && (
                            !finished ? (
                                <span>
                You will be{" "}
                                    <span className="font-extrabold">
                  {(Number(endNumber) || 0) + 1}
                                        <sup>{ordinalSuffix((Number(endNumber) || 0) + 1)}</sup>
                </span>{" "}
                                    finisher
              </span>
                            ) : (
                                <span>
                You finished{" "}
                                    <span className="font-extrabold">
                  {Number(finishPosition) || 0}
                                        <sup>{ordinalSuffix(Number(finishPosition) || 0)}</sup>
                </span>
              </span>
                            )
                        )}
                    </div>
                </div>
            )}
        </>
    );
}