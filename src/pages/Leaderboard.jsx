import React, { useEffect, useState } from "react";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
        const fetchLeaderboard = async () => {
            try {
                const res = await fetch(`${baseUrl}/api/verify/leaderboard?lab=1`, {
                    method: "POST",
                    credentials: "include", // ✅ send cookies
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({}), // ✅ empty body
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch leaderboard");
                }

                const data = await res.json();
                setLeaderboard(data.leaderboard);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) return <p>Loading leaderboard...</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
            <table className="min-w-full border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="px-4 py-2 border">Rank</th>
                    <th className="px-4 py-2 border">Nickname</th>
                    <th className="px-4 py-2 border">Finished At</th>
                </tr>
                </thead>
                <tbody>
                {leaderboard.map((entry, index) => (
                    <tr key={entry.id} className="text-center">
                        <td className="px-4 py-2 border">{entry.finishPosition}</td>
                        <td className="px-4 py-2 border">{entry.username}</td>
                        <td className="px-4 py-2 border">
                            {entry.finished_at
                                ? new Date(entry.finished_at).toLocaleString()
                                : "—"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
