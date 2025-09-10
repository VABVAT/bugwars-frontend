import React, {useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import img from "../../public/img.png";
import ProblemStatement from "../components/ProblemStatement.jsx";

const BugPage = () => {
    const [userData, setUserData] = useState(null);
    const problems = [
        {
            heading: "Bob and his obsession with images",
            info: (
                <>
                    Bob likes to brag about his life on his personal website, but he is a <b>vibe</b> coder.
                    Can you destroy his <b> vibe? </b>
                </>
            ),
            details:"Winning prize: $10",
            notes: (
                <>
                    <p className="font-semibold mt-2">Notes:</p>
                    <ol className="list-decimal pl-5 space-y-1 text-sm">
                        <li className="text-xs ">By registering you agree to receive reminder emails for this lab</li>
                        <li className="text-xs">
                            This competition carries a prize pool of <b>$10</b>.
                        </li>
                        <li className="text-xs">
                            Person who is displayed on the leaderboard as <b>Rank 1</b> will be awarded the prize money
                        </li>
                    </ol>
                </>

            ),
            startsAt:"2025-09-14T18:00:00+05:30",
            isDisabled: true,
            labId: 2,
        },
        {
            heading: "Drunk Bob and Missing Auth",
            info: (
                <>
                    Being drunk, Bob was completely wasted. He found a site where <b>JWT was not being verified</b>.
                    What will he do now? How will he get into the admin's account?
                </>
            ),
            details: "Tip: You have to log into admin@gmail.com",
            img: img,
            notes: (
                <>
                    <p className="font-semibold mt-2">Notes</p>
                    <p className="text-xs text-gray-700">
                        This follows the same pattern as my previous video — not monetized, no cash prize.
                    </p>
                </>
            ),
            isDisabled: false,
            labId: 1,
        },
    ];

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
            <Header userData={userData} setUserData={setUserData}/>

            <div className="flex flex-col lg:flex-row gap-8">
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
                    <ul className="space-y-6">
                        {problems.map((p) => (
                            <li key={p.heading} className="bg-white border border-gray-200 p-4 rounded">
                                <ProblemStatement
                                    heading={p.heading}
                                    info={p.info}
                                    details={p.details}
                                    imgIfAny={p.img}
                                    notIfAny={p.notes}
                                    isDisabled={p.isDisabled}
                                    labId={p.labId}
                                    startsAt={p.startsAt}
                                />
                            </li>
                        ))}
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
