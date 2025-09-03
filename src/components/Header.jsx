import { useState } from "react";

function Header({ userData, setUserData }) {
    const [menuOpen, setMenuOpen] = useState(false);

    async function onLogout() {
        const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
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
    }

    return (
        <header className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-400 pb-4 mb-8 font-serif">
            {/* Title */}
            <h1 className="text-3xl font-bold">BugWars</h1>

            {/* User Info */}
            {userData && (
                <section className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="text-right">
                        <p className="font-bold">{userData.email}</p>
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
    );
}

export default Header;
