import { useEffect, useState } from "react";

function Header({ userData, setUserData }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [nickname, setNickname] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    useEffect(() => {
        // open modal only when user is present and nickName is missing
        if (userData && !userData.nickName) {
            setShowModal(true);
            setNickname("");
            setMessage({ type: "", text: "" });
        } else {
            setShowModal(false);
        }
    }, [userData]);

    async function onLogout() {
        try {
            const firstResponse = await fetch(`${baseUrl}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            if (!firstResponse.ok) {
                console.error("Logout failed with status:", firstResponse.status);
                return;
            }
            setUserData(null);
            window.location.href = "/";
        } catch (err) {
            console.error("Logout error:", err);
        }
    }

    async function submitNickname() {
        const name = (nickname || "").trim();
        if (!name) {
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
                body: JSON.stringify({ nickname: name }),
            });

            const result = await res.json();

            if (result.success) {
                // update local userData with new nickname (keep other fields intact)
                setUserData((prev) => (prev ? { ...prev, nickName: name } : prev));
                setMessage({ type: "success", text: "Nickname saved successfully." });
                setTimeout(() => setShowModal(false), 700); // small delay for UX
            } else {
                setMessage({ type: "error", text: result.message || "Failed to set nickname." });
            }
        } catch (err) {
            console.error("Nickname error:", err);
            setMessage({ type: "error", text: "An error occurred. Try again." });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <header className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-400 pb-4 mb-8 font-serif">
                {/* Title */}
                <h1 className="text-3xl font-bold">BugWars</h1>

                {/* User Info */}
                {userData && (
                    <section className="flex items-center gap-4 mt-4 sm:mt-0">
                        <div className="text-right">
                            <p className="font-bold">{userData.email}</p>

                            {/* Show nickname only if it exists */}
                            {userData.nickName && (
                                <p className="text-sm text-gray-700">Nickname: {userData.nickName}</p>
                            )}

                            <p>Winnings: ${userData.winnings}</p>
                        </div>

                        {/* Profile Photo + Dropdown */}
                        <div className="relative">
                            <img
                                referrerPolicy="no-referrer"
                                src={userData.picture_id}
                                alt="Profile"
                                className="w-12 h-12 border border-black cursor-pointer"
                                onClick={() => setMenuOpen((prev) => !prev)}
                            />

                            {menuOpen && (
                                <div
                                    className="hover:bg-black hover:text-white absolute right-0 mt-2 bg-white border border-black px-4 py-1 text-sm cursor-pointer font-semibold"
                                    onClick={onLogout}
                                >
                                    Logout
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </header>

            {/* Modal for asking nickname (classic boring style) */}
            {showModal && (
                <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50">
                    <div className="w-full max-w-md border border-gray-300 bg-white p-6 rounded shadow-sm">
                        <h2 className="text-lg font-semibold mb-3">Set your nickname</h2>
                        <p className="text-sm text-gray-700 mb-3">
                            Choose a nickname to appear on the leaderboard.
                        </p>

                        {/* inline message */}
                        {message?.text && (
                            <div
                                className={`mb-3 p-2 rounded text-sm ${
                                    message.type === "error"
                                        ? "bg-red-50 border border-red-200 text-red-800"
                                        : "bg-green-50 border border-green-200 text-green-800"
                                }`}
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
                                onClick={submitNickname}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;
