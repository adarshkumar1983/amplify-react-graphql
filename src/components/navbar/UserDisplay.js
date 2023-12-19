// // UserDisplay.js
// import React from 'react';
// import "./UserDisplay.css";


// const UserDisplay = ({ user, signOut, theme }) => {
//   const usernameStyle = {
//     color: theme === 'light' ? 'black' : 'white',
//   };

//   return (
//     <div className="user-display">
//       {user ? (
//         <div className="user-info">
         
//           <div className="user-details">
//             <p className="username" style={usernameStyle}>
//               {user.username}
//             </p>
//             <p className="email">{user.email}</p>
//           </div>
//           <button onClick={signOut} className="sign-out-button">
//             Sign out
//           </button>
//         </div>
//       ) : (
//         <p>Please log in</p>
//       )}
//     </div>
//   );
// };

// export default UserDisplay;
// UserDisplay.js
import React from 'react';
import './UserDisplay.css';

const UserDisplay = ({ user, signOut, theme }) => {
  const usernameStyle = {
    color: theme === 'light' ? 'black' : 'white',
  };

  return (
    <div className="user-display">
      {user ? (
        <div className="user-info">
          <div className="user-details">
            <p className="username" style={usernameStyle}>
              {user.username}
            </p>
            <p className="email">{user.email}</p>
            <p className="user-id">User ID: {user.user_id}</p>
          </div>
          <button onClick={signOut} className="sign-out-button">
            Sign out
          </button>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};

export default UserDisplay;

