export default function SigninWithGoogle() {
    const handleLogin = () => {
        // Redirect to your backend route that starts Google OAuth
        const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
        window.location.href = `${baseUrl}/api/auth/google`;
    };

    return (
        <button
            onClick={handleLogin}
            style={{
                backgroundColor: "#000000",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
            }}
        >
            <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                style={{ width: "20px", height: "20px" }}
            />
            Sign in with Google
        </button>
    );

}