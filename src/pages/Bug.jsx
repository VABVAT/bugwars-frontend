import React, {useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import img from '../../public/img.png'
import RegisterButton from "../components/RegisterButton.jsx";

const BugPage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
        const url = `${baseUrl}/api/profile/`;
        fetch(url, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 401) {
                        window.location.href = "/";
                    }
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json()
            })
            .then((data) => {
                console.log(data);
                setUserData(data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                window.location.href = '/'
            });
    }, []);

    return (
        <div
            style={{
                fontFamily: 'Georgia, serif',
                backgroundColor: 'white',
                color: '#222',
                lineHeight: '1.6',
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '1rem',
            }}
        >
           <Header userData={userData} setUserData={setUserData}  />

            <div style={{display: 'flex', gap: '2rem'}}>
                <aside className="w-[30%]">
                    <h2 className="font-bold text-[3vh] mb-2">Previous results</h2>
                    <nav>
                        Nothing to see
                    </nav>
                </aside>
                <aside className="w-[70%]">


                    <h2 className="font-bold text-[3vh] mb-2">Upcoming Events</h2>
                    <ul>
                        <li>

                            <h2 className="font-bold text-[2vh] mb-2">Drunk Bob and missing auth</h2>
                            <div className="flex gap-x-8">
                                <div className="w-[60%] space-y-4 leading-relaxed">
                                    <p >Being drunk, Bob was completely wasted. With nothing else to do, he decided to
                                        test a very reputable website.</p>
                                    <p >After trying all his tricks and failing, on his last attempt he noticed that
                                        a <b>JWT was not being verified</b>.</p>
                                    <p>What will he do now? How will he get into the admin’s account?</p>
                                    <p><b>That is for you to figure out.</b></p>

                                </div>
                                <div className="w-[40%] flex items-center justify-center">
                                    <img
                                        src={img}
                                        alt="Drunk Bob illustration"
                                        className="w-[80%] max-h-64 object-contain rounded-lg shadow-md"
                                    />
                                </div>
                            </div>
                            <div className=" mb-4 mt-4">
                                <RegisterButton />
                            </div>
                            <div>
                                <p className="text-[14px] font-bold">Note: This is not a monetized competition</p>
                            </div>
                        </li>
                    </ul>
                </aside>
            </div>

            <footer
                style={{
                    borderTop: '1px solid #ccc',
                    marginTop: '2rem',
                    paddingTop: '1rem',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    color: '#555',
                }}
            >
                <p>&copy; {new Date().getFullYear()} BugWars. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default BugPage;
