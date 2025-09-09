import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import {useSearchParams} from "react-router-dom";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasUserName, setHasUserName] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [nickname, setNickname] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userData, setUserData] = useState(null);
    const [searchParams] = useSearchParams();
    const labNum = searchParams.get("lab") || 1; // default to 1 if missing
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    useEffect(() => {
        // fetch profile (same pattern as your BugPage)
        const url = `${baseUrl}/api/profile/`;
        fetch(url, {
            method: "GET",
            credentials: "include",
        })
            .then((r) => {
                if (!r.ok) {
                    if (r.status === 401) window.location.href = "/";
                    throw new Error(`HTTP error! Status: ${r.status}`);
                }
                return r.json();
            })
            .then((d) => setUserData(d))
            .catch((err) => {
                console.error("Error fetching user data:", err);
                window.location.href = "/";
            });

        // fetch leaderboard
        fetchLeaderboard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/verify/leaderboard?lab=${labNum}`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });

            if (!res.ok) throw new Error("Failed to fetch leaderboard");

            const data = await res.json();
            setHasUserName(Boolean(data.hasUserName));

            if (!data.hasUserName) {
                setShowModal(true);
            }
            setLeaderboard(Array.isArray(data.leaderboard) ? data.leaderboard : []);
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
            const res = await fetch(`${baseUrl}/api/verify/set-nickname`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nickname: nickname.trim() }),
            });

            const result = await res.json();
            if (result.success) {
                setShowModal(false);
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

    if (loading)
        return (
            <div className="font-serif bg-white text-[#222] min-h-screen flex items-center justify-center">
                <p className="text-sm">Loading leaderboard...</p>
            </div>
        );

    return (
        <div className="font-serif bg-white text-[#222] leading-relaxed max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
            <Header userData={userData} setUserData={setUserData} />

            <main className="mt-8">
                <section className="bg-white border border-gray-300 rounded p-6">
                    <h1 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2">Leaderboard</h1>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                            <tr className="bg-white">
                                <th className="text-left px-4 py-2 border-b border-gray-200">Rank</th>
                                <th className="text-left px-4 py-2 border-b border-gray-200">Nickname</th>
                                <th className="text-left px-4 py-2 border-b border-gray-200">Finished At</th>
                            </tr>
                            </thead>

                            <tbody>
                            {leaderboard.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-4 py-4 text-gray-600">
                                        No entries yet.
                                    </td>
                                </tr>
                            )}

                            {leaderboard.map((entry) => (
                                <tr key={entry.id || `${entry.username}-${entry.finishPosition}`} className="">
                                    <td className="px-4 py-3 border-b border-gray-100">{entry.finishPosition}</td>
                                    <td className="px-4 py-3 border-b border-gray-100">{entry.username || "—"}</td>
                                    <td className="px-4 py-3 border-b border-gray-100">
                                        {entry.finished_at ? new Date(entry.finished_at).toLocaleString() : "—"}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mt-6">
                    <div className="text-sm text-gray-700">
                        <p>
                            This page is intentionally plain. If your nickname is missing then you will not appear here, please reload to set your nickname
                        </p>
                    </div>
                </section>
            </main>

            <footer className="border-t border-gray-300 mt-10 pt-4 text-center text-xs text-gray-600">
                <p>&copy; {new Date().getFullYear()} BugWars. All rights reserved.</p>
            </footer>

            {/* Simple modal — classic boring style */}
            {showModal && (
                <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50">
                    <div className="w-full max-w-md border border-gray-300 bg-white p-6 rounded shadow-sm">
                        <h2 className="text-lg font-semibold mb-3">Set your nickname</h2>
                        <p className="text-sm text-gray-700 mb-3">
                            Please choose a nickname to display on the leaderboard.
                        </p>

                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4 text-sm"
                            placeholder="Enter nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />

                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-3 py-1 text-sm border border-gray-300 rounded bg-gray-100"
                                onClick={() => setShowModal(false)}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-3 py-1 text-sm border border-gray-800 rounded bg-[#222] text-white"
                                onClick={updateNickname}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
