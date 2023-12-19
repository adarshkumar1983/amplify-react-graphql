// import { Amplify } from 'aws-amplify';

// import { withAuthenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
// import config from './amplifyconfiguration.json';
// Amplify.configure(config);

// function App({ signOut, user }) {
//   return (
//     <>
//       <h1>Hello {user.username}</h1>
//       <button onClick={signOut}>Sign out</button>
//     </>
//   );
// }

// export default withAuthenticator(App);

import React, { useEffect, useState } from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppBar from './components/navbar/nav';
import ItemList from './components/itemlist/ItemList';
import AddItemForm from './components/item/AddItemForm';
import ItemDetails from './components/Relation/ItemDetail';

import config from './amplifyconfiguration.json';

Amplify.configure(config);



function App({ signOut, user }) {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // await Auth.currentSession();
        setAuthenticated(true);
      } catch (error) {
        setAuthenticated(false);
      }
    };

    checkAuthState();
  }, []); // Run only once when component mounts

  if (!authenticated) {
    // User is not signed in
    return <div>Redirecting...</div>; // You can also redirect to a sign-in page
  }


  return (
    <BrowserRouter>
      <div>
      <AppBar signOut={signOut} user={user} />

      <AddItemForm user={user} />
  
   
       
        <div style={{ marginTop: '30px', padding: '1px' }}>
        {/* <AddItemForm /> */}
          <Routes>
            <Route path="/" element={<ItemList user={user}/>} />
            <Route path="/items/:item_name" element={<ItemDetails user={user} />} />
          </Routes>
          
        </div>
      </div>
    </BrowserRouter>
  );
}

export default withAuthenticator(App);




