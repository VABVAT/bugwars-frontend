import React, { useEffect, useState } from "react";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasUserName, setHasUserName] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [nickname, setNickname] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/verify/leaderboard?lab=1`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });

            if (!res.ok) throw new Error("Failed to fetch leaderboard");

            const data = await res.json();
            setHasUserName(data.hasUserName);

            if (!data.hasUserName) {
                setShowModal(true);
            } else {
                setLeaderboard(data.leaderboard);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateNickname = async () => {
        if (nickname.trim() === "") {
            alert("Nickname cannot be empty.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Dummy endpoint
            const res = await fetch(`${baseUrl}/api/verify/set-nickname`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: nickname.trim() }),
            });

            const result = await res.json();
            if (result.success) {
                alert("Nickname saved successfully!");
                setShowModal(false);
                fetchLeaderboard(); 
            } else {
                alert(result.message || "Failed to update nickname.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while updating nickname.");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    if (loading) return <p className="text-center mt-8 text-black">Loading leaderboard...</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white border border-gray-300 rounded shadow">
                <h2 className="text-2xl font-semibold mb-6 text-black text-center">Leaderboard</h2>

                <table className="w-full border border-gray-300">
                    <thead className="bg-gray-100 text-black">
                        <tr>
                            <th className="px-6 py-3 border text-left">Rank</th>
                            <th className="px-6 py-3 border text-left">Nickname</th>
                            <th className="px-6 py-3 border text-left">Finished At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((entry) => (
                            <tr key={entry.id} className="text-black text-center">
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

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4 text-black">Set Your Nickname</h3>
                        <input
                            type="text"
                            className="w-full p-2 mb-4 border border-gray-300 rounded"
                            placeholder="Enter your nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-black rounded"
                                onClick={() => setShowModal(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-black text-white rounded"
                                onClick={updateNickname}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Save Nickname"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
