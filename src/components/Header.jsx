import { useState } from "react";

function Header({ userData, setUserData }) {
  const [menuOpen, setMenuOpen] = useState(false);

  async function onLogout() {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      const firstResponse = await fetch(`${baseUrl}/api/auth/logout`, {
        method: "POST",
        credentials: 'include'
      })
    if (!firstResponse.ok) {
      console.error("Logout failed with status:", firstResponse.status);
      return;
    }
    setUserData(null);
    window.location.href = "/";

  }

  return (
      <header
          style={{
            borderBottom: "1px solid #ccc",
            paddingBottom: "1rem",
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative", // so dropdown positions nicely
          }}
      >
        <h1 style={{ fontSize: "2.5rem", margin: 0 }}>BugWars</h1>
        {userData && (
            <section style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: "0", fontWeight: "bold" }}>{userData.email}</p>
                <p style={{ margin: "0" }}>Winnings: ${userData.winnings}</p>
              </div>

              {/* Profile Photo */}
              <div style={{ position: "relative" }}>
                <img
                    referrerPolicy="no-referrer"
                    src={userData.picture_id}
                    alt="Profile"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                    onClick={() => setMenuOpen((prev) => !prev)}
                />

                {/* Dropdown */}
                {menuOpen && (
                    <div
                        style={{
                          position: "absolute",
                          right: 0,
                          marginTop: "0.5rem",
                          background: "white",
                          border: "1px solid #ccc",
                          borderRadius: "0.5rem",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          padding: "0.5rem 1rem",
                          cursor: "pointer",
                          zIndex: 10,
                        }}
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
