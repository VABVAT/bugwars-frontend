import SigninWithGoogle from "../components/SIgninWithGoogle.jsx";

const Home = ({ isLoggedIn }) => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center font-serif px-4">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-wide mb-6 border-b-2 border-black pb-2 text-center">
                BUGWARS
            </h1>

            {/* Subtitle / intro text */}
            <p className="text-base sm:text-lg mb-6 max-w-md text-center leading-relaxed">
                Welcome to <span className="font-bold">BugWars</span>, where challenges
                await and your skills are tested. Sign in to begin your journey.
            </p>

            {/* Sign in button (only if logged out) */}
            {!isLoggedIn && (
                <div>
                    <SigninWithGoogle />
                </div>
            )}
        </div>
    );
};

export default Home;
