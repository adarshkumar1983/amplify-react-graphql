// import "./styles.css";
// import React, { useState, useEffect } from "react";
// import logo from "./logo.png";
// import "../item/AddItemForm"
// import UserDisplay from './UserDisplay'; 




// function AppBar({ signOut, user }) {
//   const [theme, setTheme] = useState('light');

//   const [showProfile, setShowProfile] = useState(false);

//   // Function to toggle the theme
//   const toggleTheme = () => {
//     setTheme(theme === 'light' ? 'dark' : 'light');
//   };

//   // Watch for changes in the theme and apply the style
//   useEffect(() => {
//     const body = document.body;
//     body.classList.remove('light', 'dark');
//     body.classList.add(theme);
//   }, [theme]);


//   const handleProfileClick = () => {
//     setShowProfile(!showProfile);
//   };



//   return (

// <div>


//     <div className={`app-bar ${theme === 'dark' ? 'dark' : ''}`}>
      
//       <div className="app-bar__logo">
//         <img src={logo} alt="Logo" className="round-image" />
//         <div className="profile-wrapper">
//             <div onClick={handleProfileClick} className="profile-trigger">
//               {user ? (
//                 <img src={user.profilePicture} alt="Profile" className="profile-picture" />
//               ) : (
//                 <i className="bi bi-person"></i>
//               )}
//             </div>
//             {showProfile && <UserDisplay user={user} signOut={signOut} />}
//           </div>

//       </div>
    
//       <button onClick={toggleTheme} className="theme-toggle">
//         {theme === 'light' ? (
//             <i className="bi bi-brightness-high-fill"></i> // Light mode icon
//         ) : (
//           <i className="bi bi-moon-stars-fill"></i> // Night mode icon
//         )}
      
//       </button>



//     </div>
//     </div>


//   );
// }

// export default AppBar;

// AppBar.js
// AppBar.js
import "./styles.css";
// AppBar.js
// AppBar.js
import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import UserDisplay from './UserDisplay';

function AppBar({ signOut, user, onAddButtonClick }) {
  const [theme, setTheme] = useState('light');
  const [showProfile, setShowProfile] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  useEffect(() => {
    const body = document.body;
    body.classList.remove('light', 'dark');
    body.classList.add(theme);
  }, [theme]);

  return (
    <div className={`app-bar ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="app-bar__left">
        <img src={logo} alt="Logo" className="round-image" />
      </div>

      <div className="app-bar__middle">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? (
            <i className="bi bi-brightness-high-fill"></i>
          ) : (
            <i className="bi bi-moon-stars-fill"></i>
          )}
        </button>
      </div>

      <div className="app-bar__right">
        {user && (
          <div className="profile-wrapper">
            <div onClick={handleProfileClick} className="profile-trigger">
            <i className="bi bi-person-check"></i>
            </div>
            {showProfile && (
              <div className="profile-dropdown">
                <UserDisplay user={user} signOut={signOut} theme={theme} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppBar;

