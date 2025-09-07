import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import img from "../../public/img.png";
import RegisterButton from "../components/RegisterButton.jsx";
import StartButton from "../components/StartButton.jsx";
import Stats from "../components/Stats.jsx";
import ProblemStatement from "../components/ProblemStatement.jsx";

const BugPage = () => {
    const [userData, setUserData] = useState(null);
    const [render, setRender ] = useState(0);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
        const url = `${baseUrl}/api/profile/`;
        fetch(url, {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 401) {
                        window.location.href = "/";
                    }
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                window.location.href = "/";
            });
    }, []);

    return (
        <div className="font-serif bg-white text-[#222] leading-relaxed max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Header userData={userData} setUserData={setUserData} />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <aside className="lg:w-1/3 w-full">
                    <h2 className="text-xl font-bold p-2 mb-4 border-b border-gray-400">
                        Previous Results
                    </h2>
                    <nav className="text-base">
                        <p>Nothing to see</p>
                    </nav>
                </aside>

                {/* Main Section */}
                <aside className="lg:w-2/3 w-full">
                    <h2 className="text-xl font-bold p-2 mb-4 border-b border-gray-400">
                        Upcoming Events
                    </h2>
                    <ul className="list-disc pl-6">
                        <li className="mb-8">
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Problem Statement Component*/}
                                {/* <div className="md:w-3/5 w-full space-y-3">
                                    <p>
                                        Being drunk, Bob was completely wasted. With nothing else to
                                        do, he decided to test a very reputable website.
                                    </p>
                                    <p>
                                        After trying all his tricks and failing, on his last attempt
                                        he noticed that a <b>JWT was not being verified</b>.
                                    </p>
                                    <p>
                                        What will he do now? How will he get into the admin’s
                                        account?
                                    </p>
                                    <p>
                                        <b>That is for you to figure out.</b>
                                    </p>
                                    <p className="text-xs font-bold">Tip: You have to log into admin@gmail.com </p>
                                </div> */}
                                <ProblemStatement
                                    heading = "Drunk Bob and Missing Auth"
                                    info={
                                        <>
                                            Being drunk, Bob was completely wasted. With nothing else to do, he decided to test a very reputable website.
                                            <br /><br />
                                            After trying all his tricks and failing, on his last attempt he noticed that  <b>JWT was not being verified</b>.
                                            <br /><br />
                                            What will he do now? How will he get into the admin's account?
                                            <br /><br />
                                            <b>That is for you to figure out.</b>
                                        </>
                                    }
                                    details="Tip: You have to log into admin@gmail.com"
                                />

                                {/* Image */}
                                <div className="md:w-2/5 w-full flex items-center justify-center">
                                    <img
                                        src={img}
                                        alt="Drunk Bob illustration"
                                        className="w-[90%] max-h-52 object-contain"
                                    />
                                </div>
                            </div>

                            {/* Register Button */}
                            <div className="mt-4 mb-4">
                                <StartButton render={render} setRender={setRender} />
                            </div>
                            <Stats render={render} setRender={setRender} />
                            {/* Note */}
                            <div>
                                <p className="font-bold">Notes:</p>
                                <ol>
                                    <li className="text-gray-700 text-xs">
                                        This competition follows the same pattern as my previous video <br/>
                                        Thus it is not monetized and carries no cash prize
                                    </li>
                                </ol>
                            </div>
                        </li>
                    </ul>
                </aside>
            </div>

            <footer className="border-t border-gray-400 mt-8 pt-4 text-center text-sm text-gray-600">
                <p>&copy; {new Date().getFullYear()} BugWars. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default BugPage;
