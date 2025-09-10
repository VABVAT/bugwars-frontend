import React, {useEffect, useState} from "react";

const pad = (n) => String(n).padStart(2, "0");

function getTimeDiffParts(ms) {
    if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    const total = Math.floor(ms / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    return { days, hours, minutes, seconds, total };
}

const Timer = ({ startsAt }) => {
    const [remaining, setRemaining] = useState(null);

    useEffect(() => {
        if (!startsAt) return;

        // allow Date, number, or ISO string
        const target = startsAt instanceof Date ? startsAt.getTime() : Number(new Date(startsAt));

        function tick() {
            const now = Date.now();
            const diff = target - now;
            setRemaining(diff);
        }

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [startsAt]);

    if (startsAt == null) return null;
    if (remaining == null) return null;

    if (remaining <= 0) {
        return (
            <div className="mt-3 text-sm text-gray-700">
                <span className="font-semibold">Competition started</span>
            </div>
        );
    }

    const { days, hours, minutes, seconds } = getTimeDiffParts(remaining);

    return (
        <div className="mt-3 text-sm text-gray-700">
            <div className=" mt-1 text-xs text-gray-600">
                Starts in <b>{days > 0 ? `${days} day${days > 1 ? "s" : ""}, ` : ""}
                {hours}h {minutes}m {seconds}s</b>
            </div>
        </div>
    );
};

export default Timer;