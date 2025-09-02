import React, { useEffect, useState } from 'react';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
        const response = await fetch(`${baseUrl}/api/auth/me`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
      await fetch(`${baseUrl}/api/auth/logout`, {
        credentials: 'include',
      });
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-black">BugWars</h1>
        <div className="flex items-center">
          {user && (
            <>
              <span className="font-bold text-lg mr-4">{user.email}</span>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
