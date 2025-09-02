import SigninWithGoogle from "../components/SIgninWithGoogle.jsx";

const Home = ({ isLoggedIn }) => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <h1 className="text-[40px] text-bold font-black mb-4">BUGWARS</h1>
        {!isLoggedIn && <SigninWithGoogle />}
      </div>
    </div>
  );
};

export default Home;
