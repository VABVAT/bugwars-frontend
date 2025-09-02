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
                  <p style={{ margin: '0' }}>Winnings: {userData.winnings}</p>
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
          <aside style={{ width: '200px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Archives</h2>
            <nav>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li><a href="#" style={{ textDecoration: 'none', color: '#000' }}>January 2025</a></li>
                <li><a href="#" style={{ textDecoration: 'none', color: '#000' }}>February 2025</a></li>
                <li><a href="#" style={{ textDecoration: 'none', color: '#000' }}>March 2025</a></li>
              </ul>
            </nav>
          </aside>

          <main style={{ flex: 1 }}>
            <article style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>First Post</h2>
              <p>This is the content of the first blog post.</p>
            </article>

            <article style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Second Post</h2>
              <p>This is the content of the second blog post.</p>
            </article>

            <article>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Third Post</h2>
              <p>This is the content of the third blog post.</p>
            </article>
          </main>
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
