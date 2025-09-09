export default function SigninWithGoogle() {
    const handleLogin = () => {
        // Redirect to your backend route that starts Google OAuth
        console.log("hi");
        const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
        console.log(baseUrl);
        window.location.href = `${baseUrl}/api/auth/google`;
    };

    return (
        <button
            onClick={handleLogin}
            className="flex items-center gap-2 border border-black bg-white px-4 py-2 font-serif text-sm font-semibold hover:bg-black hover:text-white cursor-pointer"
        >
            <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                className="w-5 h-5"
            />
            Sign in with Google
        </button>
    );
}
