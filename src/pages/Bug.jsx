import React, { useEffect, useState } from 'react';

const BugPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const url = `${baseUrl}/api/profile/`;
    fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
  }, []);

  return (
      <div
          style={{
            fontFamily: 'Georgia, serif',
            backgroundColor: 'white',
            color: '#222',
            lineHeight: '1.6',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '1rem',
          }}
      >
        <header
            style={{
              borderBottom: '1px solid #ccc',
              paddingBottom: '1rem',
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
        >
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>BugWars</h1>
          {userData && (
              <section style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: '0', fontWeight: 'bold' }}>{userData.email}</p>
                  <p style={{ margin: '0' }}>Winnings:${userData.winnings}</p>
                </div>
                <img
                    referrerPolicy="no-referrer"
                    src={userData.picture_id}
                    alt="Profile"
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
              </section>
          )}
        </header>

        <div style={{ display: 'flex', gap: '2rem' }}>
          <aside className="w-[30%]">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Previous results</h2>
            <nav>
                    Nothing to see
            </nav>
          </aside>
            <aside className="w-[70%]">
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Upcoming Events</h2>
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
