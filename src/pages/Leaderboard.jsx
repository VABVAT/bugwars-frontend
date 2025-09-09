import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import { useSearchParams } from "react-router-dom";

const MessageBox = ({ message, onClose }) => {
    if (!message?.text) return null;
    const isError = message.type === "error";
    return (
        <div
            className={`max-w-5xl mx-auto my-4 p-3 rounded text-sm flex justify-between items-start
        ${isError ? "bg-red-50 border border-red-200 text-red-800" : "bg-green-50 border border-green-200 text-green-800"}`}
        >
            <div>{message.text}</div>
            <button
                onClick={onClose}
                className="ml-4 text-xs font-semibold px-2 py-1 border rounded bg-white"
                aria-label="dismiss message"
            >
                ×
            </button>
        </div>
    );
};

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasUserName, setHasUserName] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [nickname, setNickname] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState({ type: "", text: "" });

    const [searchParams] = useSearchParams();
    const labNum = searchParams.get("lab") || 1; // default to 1 if missing
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    useEffect(() => {
        // fetch profile
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
    }, [labNum]);

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
                setShowModal(false);
            }
            setLeaderboard(Array.isArray(data.leaderboard) ? data.leaderboard : []);
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "Unable to load leaderboard. Please try again later." });
        } finally {
            setLoading(false);
        }
    };

    const updateNickname = async () => {
        if (nickname.trim() === "") {
            setMessage({ type: "error", text: "Nickname cannot be empty." });
            return;
        }

        setIsSubmitting(true);
        setMessage({ type: "", text: "" });

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
                setMessage({ type: "success", text: "Nickname saved successfully!" });
                // refresh leaderboard to show the nickname
                fetchLeaderboard();
            } else {
                setMessage({ type: "error", text: result.message || "Failed to update nickname." });
            }
        } catch (err) {
            console.error(err);
            setMessage({ type: "error", text: "An error occurred while updating nickname." });
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

            {/* message box shown near top */}
            <MessageBox message={message} onClose={() => setMessage({ type: "", text: "" })} />

            <main className="mt-4">
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

                        {/* show message (inline) inside modal too for immediate feedback */}
                        {message?.text && (
                            <div
                                className={`mb-3 p-2 rounded text-sm ${message.type === "error"
                                    ? "bg-red-50 border border-red-200 text-red-800"
                                    : "bg-green-50 border border-green-200 text-green-800"}`}
                            >
                                {message.text}
                            </div>
                        )}

                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded mb-4 text-sm"
                            placeholder="Enter nickname"
                            value={nickname}
                            onChange={(e) => {
                                setNickname(e.target.value);
                                // remove message as user types
                                if (message?.text) setMessage({ type: "", text: "" });
                            }}
                        />

                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-3 py-1 text-sm border border-gray-300 rounded bg-gray-100"
                                onClick={() => {
                                    setShowModal(false);
                                    setMessage({ type: "", text: "" });
                                }}
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
