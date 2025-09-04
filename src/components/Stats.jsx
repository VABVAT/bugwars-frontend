import {useEffect, useState} from "react";

export default function Stats({render, setRender}) {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const [startNumber, setStartNumber] = useState(0);
    const [endNumber, setEndNumber] = useState(0);

    async function successFetcher(){
        const data = await fetch(`${baseUrl}/api/verify/stats/?lab=lab1`, {
            method: "GET",
            credentials: "include"
        });
        return await data.json();

    }
    useEffect(() => {
        successFetcher().then(response => {
            setStartNumber(response.Started);
            setEndNumber(response.Finished);
        })
    }, [render]);

    return (
        <div>
            <div className="mt-4">
                <span className="text-green-500 font-bold">People started:</span> {startNumber}
            </div>
            <div className="mb-4">
                <span className="text-red-700 font-bold">People finished:</span> {endNumber}
            </div>
        </div>
    )
}