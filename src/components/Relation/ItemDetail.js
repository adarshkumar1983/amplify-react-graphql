// import React, { useState, useEffect } from "react";
// import "./ItemDetail.css";
// import { useLocation } from "react-router-dom";
// import "../itemlist/ItemList";

// import { useParams } from "react-router-dom";
// function ItemDropdown({ itemName }) {
//   const [objectItems, setObjectItems] = useState([]);
//   const [containerItems, setContainerItems] = useState([]);
//   const [selectedObjectItem, setSelectedObjectItem] = useState("");
//   const [selectedContainerItem, setSelectedContainerItem] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const location = useLocation();
//   //  const selectedItem = location.state ? location.state.item : null;
//   const [relations, setRelations] = useState([]);
//   const [error, setError] = useState(null);
//   const { item_name } = useParams();
//   const [itemDetails, setItemDetails] = useState({});
//   const [itemRelation, setItemRelation] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchItemDetails = async () => {
//       try {
//         const encodedItemName = encodeURIComponent(item_name);
//         const response = await fetch(`https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/itemdetails?item_name=${encodedItemName}`);

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         const body = JSON.parse(data.body);
//         setItemDetails(body);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const fetchItemRelation = async () => {
//       try {
//         const encodedItemName = encodeURIComponent(item_name); 
//         const response = await fetch(`https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/relationitems?item_name=${encodedItemName}`);
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
  
//         const data = await response.json();
//         const body = JSON.parse(data.body);
//         setItemRelation(body);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };



//     // Fetch object items 
     

//     const objectApiUrl =
//       "https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user?item_type=object";
//     fetchItems(objectApiUrl, "object");

//     // Fetch container items
     
     
    
//     const containerApiUrl =
//       "https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user?item_type=container";
//     fetchItems(containerApiUrl, "container");

//     fetchItemRelation();
//     fetchItemDetails();
//   }, [item_name]);

//   const fetchItems = (apiUrl, itemType) => {
//     fetch(apiUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const parsedData = JSON.parse(data.body);
//         const itemNames = parsedData.map((item) => item.item_name);
//         if (itemType === "object") {
//           setObjectItems(itemNames);
//         } else if (itemType === "container") {
//           setContainerItems(itemNames);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   const handleObjectSelectChange = (event) => {
//     setSelectedObjectItem(event.target.value);
//   };

//   const handleContainerSelectChange = (event) => {
//     setSelectedContainerItem(event.target.value);
//   };

//   const handleRelationItems = async () => {
//     try {
//       const response = await fetch(
//         "https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/relationitems",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             item_name: selectedObjectItem,
//             container_name: selectedContainerItem,
//           }),
//         },
//       );

//       if (response.ok) {
//         // Handle success - maybe show a success message or reset the selections
//         console.log("Items posted successfully!");
//         setSelectedObjectItem("");
//         setSelectedContainerItem("");
//       } else {
//         // Handle errors - maybe show an error message
//         console.error("Failed to post items");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <div>
    
// <div className="relation_container"> {/* Use the class names from the CSS file */}
//       {/* <h1 className="heading">Relations for {item_name}</h1> */}
//       <div className="item-details-container">
//        {/* <h1>Item Details for {item_name}</h1> */}
//        {isLoading && <p>Loading...</p>}
//        {error && <p>Error: {error.message}</p>}
//        {!isLoading && !error && (
//         <div className="details">
//           <p>
//             <strong>Item Name:</strong> {itemDetails.item_name}
//           </p>
//           <p>
//             <strong>Description:</strong> {itemDetails.description}
//           </p>
//           <p>
//             <strong>Item Type:</strong> {itemDetails.item_type}
//           </p>
        
//         </div>
//       )}
//     </div>
//       {isLoading && <p className="message">Loading...</p>}
//       {error && <p className="errorMessage">Error: {error.message}</p>}
//       {!isLoading && !error && (
//         <div className="relation">
//   <div className="item-container">
//       <p>
//         <span className="item-name">{itemRelation[0]?.item_name}</span>
       
//       </p>
//     </div>
//     <strong style={{ color: 'red' }}>IN</strong>
//     <div className="container-name">
//       <p>
//         <span className="container-name-text">{itemRelation[0]?.container_name}</span>
//       </p>
//     </div>


//         </div>
//       )}
//     </div>

//       <div>
//         <div className="item-dropdown-container">
//           {showDropdown && (
//             <div className="dropdown-content">
//               <h1>Item Dropdown</h1>
//               <div className="items-wrapper">
//                 <div className="object-items">
//                   <h2>Objects</h2>
//                   <select
//                     value={selectedObjectItem}
//                     onChange={handleObjectSelectChange}
//                     className="full-width-select"
//                   >
//                     <option value="">Select.... </option>
//                     {objectItems.map((itemName, index) => (
//                       <option key={index} value={itemName}>
//                         {itemName}
//                       </option>
//                     ))}
//                   </select>
//                   {selectedObjectItem && <p>Selected: {selectedObjectItem}</p>}
//                 </div>
//                 <div className="container-items">
//                   <h2>Containers</h2>
//                   <select
//                     value={selectedContainerItem}
//                     onChange={handleContainerSelectChange}
//                     className="full-width-select"
//                   >
//                     <option value="">Select.....</option>
//                     {containerItems.map((itemName, index) => (
//                       <option key={index} value={itemName}>
//                         {itemName}
//                       </option>
//                     ))}
//                   </select>
//                   {selectedContainerItem && (
//                     <p>Selected: {selectedContainerItem}</p>
//                   )}
//                 </div>
//               </div>
//               <button onClick={handleRelationItems} className="post-button">
//                 Relation
//               </button>
//             </div>
//           )}
//         </div>
//         <button className="toggle-button" onClick={toggleDropdown}>
//           Dropdown
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ItemDropdown;


// import React, { useState, useEffect } from "react";
// import "./ItemDetail.css";
// import { useParams } from "react-router-dom";

// function ItemDropdown() {
//   const [objectItems, setObjectItems] = useState([]);
//   const [containerItems, setContainerItems] = useState([]);
//   const [selectedObjectItem, setSelectedObjectItem] = useState("");
//   const [selectedContainerItem, setSelectedContainerItem] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const { item_name } = useParams();
//   const [itemDetails, setItemDetails] = useState({});
//   const [itemRelation, setItemRelation] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchItemDetails = async () => {
//       try {
//         const encodedItemName = encodeURIComponent(item_name);
//         const response = await fetch(
//           `https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/itemdetails?item_name=${encodedItemName}`
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         const body = JSON.parse(data.body);
//         setItemDetails(body);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const fetchItemRelation = async () => {
//       try {
//         const encodedItemName = encodeURIComponent(item_name);
//         const response = await fetch(
//           `https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/relationitems?item_name=${encodedItemName}`
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         const body = JSON.parse(data.body);
//         setItemRelation(body);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const fetchItems = async (apiUrl, itemType) => {
//       try {
//         const response = await fetch(apiUrl);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         const parsedData = JSON.parse(data.body);
//         const itemNames = parsedData.map((item) => item.item_name);
//         if (itemType === "object") {
//           setObjectItems(itemNames);
//         } else if (itemType === "container") {
//           setContainerItems(itemNames);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     const objectApiUrl =
//       "https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user?item_type=object";
//     fetchItems(objectApiUrl, "object");

//     const containerApiUrl =
//       "https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user?item_type=container";
//     fetchItems(containerApiUrl, "container");

//     fetchItemRelation();
//     fetchItemDetails();
//   }, [item_name]);

//   const handleObjectSelectChange = (event) => {
//     setSelectedObjectItem(event.target.value);
//   };

//   const handleContainerSelectChange = (event) => {
//     setSelectedContainerItem(event.target.value);
//   };

//   const handleRelationItems = async () => {
//     try {
//       const response = await fetch(
//         "https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/relationitems",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             user_id: "your_user_id",  // Replace with the actual user_id
//             item_name: selectedObjectItem,
//             container_name: selectedContainerItem,
//           }),
//         }
//       );

//       if (response.ok) {
//         console.log("Items posted successfully!");
//         setSelectedObjectItem("");
//         setSelectedContainerItem("");
//       } else {
//         console.error("Failed to post items");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   return (
//     <div>
//       <div className="relation_container">
//         {isLoading && <p>Loading...</p>}
//         {error && <p>Error: {error.message}</p>}
//         {!isLoading && !error && (
//           <div className="details">
//             <p>
//               <strong>Item Name:</strong> {itemDetails.item_name}
//             </p>
//             <p>
//               <strong>Description:</strong> {itemDetails.description}
//             </p>
//             <p>
//               <strong>Item Type:</strong> {itemDetails.item_type}
//             </p>
//           </div>
//         )}
//         {isLoading && <p className="message">Loading...</p>}
//         {error && <p className="errorMessage">Error: {error.message}</p>}
//         {!isLoading && !error && (
//           <div className="relation">
//             <div className="item-container">
//               <p>
//                 <span className="item-name">{itemRelation[0]?.item_name}</span>
//               </p>
//             </div>
//             <strong style={{ color: 'red' }}>IN</strong>
//             <div className="container-name">
//               <p>
//                 <span className="container-name-text">
//                   {itemRelation[0]?.container_name}
//                 </span>
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       <div>
//         <div className="item-dropdown-container">
//           {showDropdown && (
//             <div className="dropdown-content">
//               <h1>Item Dropdown</h1>
//               <div className="items-wrapper">
//                 <div className="object-items">
//                   <h2>Objects</h2>
//                   <select
//                     value={selectedObjectItem}
//                     onChange={handleObjectSelectChange}
//                     className="full-width-select"
//                   >
//                     <option value="">Select.... </option>
//                     {objectItems.map((itemName, index) => (
//                       <option key={index} value={itemName}>
//                         {itemName}
//                       </option>
//                     ))}
//                   </select>
//                   {selectedObjectItem && (
//                     <p>Selected: {selectedObjectItem}</p>
//                   )}
//                 </div>
//                 <div className="container-items">
//                   <h2>Containers</h2>
//                   <select
//                     value={selectedContainerItem}
//                     onChange={handleContainerSelectChange}
//                     className="full-width-select"
//                   >
//                     <option value="">Select.....</option>
//                     {containerItems.map((itemName, index) => (
//                       <option key={index} value={itemName}>
//                         {itemName}
//                       </option>
//                     ))}
//                   </select>
//                   {selectedContainerItem && (
//                     <p>Selected: {selectedContainerItem}</p>
//                   )}
//                 </div>
//               </div>
//               <button onClick={handleRelationItems} className="post-button">
//                 Relation
//               </button>
//             </div>
//           )}
//         </div>
//         <button className="toggle-button" onClick={toggleDropdown}>
//           Dropdown
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ItemDropdown;


import React, { useState, useEffect } from 'react';
import "./ItemDetail.css";
import { useParams } from 'react-router-dom';
// import UserDisplay from '../navbar/UserDisplay';
import "../itemlist/ItemList";

function ItemDropdown({ user }) {
  const [objectItems, setObjectItems] = useState([]);
  const [containerItems, setContainerItems] = useState([]);
  const [selectedObjectItem, setSelectedObjectItem] = useState('');
  const [selectedContainerItem, setSelectedContainerItem] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const { item_name } = useParams();
  const [itemDetails, setItemDetails] = useState({});
 const [itemRelation, setItemRelation] = useState({});
  // const [itemRelation, setItemRelation] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const encodedItemName = encodeURIComponent(item_name);
        console.log('space count:', encodedItemName);
        const user_id= user ? user.username : '';
        
        const response = await fetch(
          `https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/itemdetails?user_id=${user_id}&item_name=${encodedItemName}`
        );
        console.log(`Response Status: ${response.status}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        const body = JSON.parse(data.body);
        setItemDetails(body);
      } catch (error) {
        console.error('Error fetching relation items:', error);
        setError(error);
      } finally {
        console.log('Fetch operation completed.');
        setIsLoading(false);
      }
    };


     
      
 

    const fetchItemRelation = async () => {
      try {
    
        const user_id = user ? user.username : '';
        const encodedItemName = encodeURIComponent(item_name);
    
    
        const response = await fetch(
          `https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/relationitems?user_id=${user_id}&item_name=${encodedItemName}`
        );
    
        console.log(`Response Status: ${response.status}`);
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        const body = JSON.parse(data.body);
        
        console.log('Fetched relation items:', body);
        
        setItemRelation(body);
      } catch (error) {
        console.error('Error fetching relation items:', error);
        setError(error);
      } finally {
        console.log('Fetch operation completed.');
        setIsLoading(false);
      }
    };
    


    const fetchItems = async (apiUrl, itemType) => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const parsedData = JSON.parse(data.body);
        const itemNames = parsedData.map((item) => item.item_name);
        if (itemType === "object") {
          setObjectItems(itemNames);
        } else if (itemType === "container") {
          setContainerItems(itemNames);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };



    const objectApiUrl =
      "https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user?item_type=object";
    fetchItems(objectApiUrl, "object");

    const containerApiUrl =
      "https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user?item_type=container";
    fetchItems(containerApiUrl, "container");

    fetchItemRelation();
    fetchItemDetails();

  }, [item_name , user]);

  const handleObjectSelectChange = (event) => {
    setSelectedObjectItem(event.target.value);
  };

  const handleContainerSelectChange = (event) => {
    setSelectedContainerItem(event.target.value);
  };

  const handleRelationItems = async () => {
    try {
      const requestBody = {
        user_id: user ? user.username : '',
        item_name: selectedObjectItem,
        container_name: selectedContainerItem,
      };
  
      // Log the request payload
      console.log('Request Payload:', requestBody);
  
      const response = await fetch(
        "https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/relationitems",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Response Data:', responseData);
        console.log("Items posted successfully!");
        setSelectedObjectItem("");
        setSelectedContainerItem("");
      } else {
        console.error("Failed to post items");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>


      <div className="relation_container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!isLoading && !error && (
          <div className="details">
            <p>
              <strong>Item Name:</strong> {itemDetails.item_name}
            </p>
            <p>
              <strong>Description:</strong> {itemDetails.description}
            </p>
            <p>
              <strong>Item Type:</strong> {itemDetails.item_type}
            </p>
          </div>
        )}
{isLoading && <p className="message">Loading...</p>}
{error && <p className="errorMessage">Error: {error.message}</p>}
{!isLoading && !error && itemRelation.message === "Relation not found" && (
  <p className="message">No relation items found.</p>
)}
{!isLoading && !error && itemRelation.message !== "Relation not found" && (
  <div className="relation">
    <div className="item-container">
      <p>
        <span className="item-name">{itemRelation.item_name}</span>
      </p>
    </div>
    <strong style={{ color: 'red' }}>IN</strong>
    <div className="container-name">
      <p>
        <span className="container-name-text">
          {itemRelation.container_name}
        </span>
      </p>
    </div>
  </div>
)}


      </div>


 
      <div>
        <div className="item-dropdown-container">
          {showDropdown && (
            <div className="dropdown-content">
              <h1>Item Dropdown</h1>
              <div className="items-wrapper">
                <div className="object-items">
                  <h2>Objects</h2>
                  <select
                    value={selectedObjectItem}
                    onChange={handleObjectSelectChange}
                    className="full-width-select"
                  >
                    <option value="">Select.... </option>
                    {objectItems.map((itemName, index) => (
                      <option key={index} value={itemName}>
                        {itemName}
                      </option>
                    ))}
                  </select>
                  {selectedObjectItem && (
                    <p>Selected: {selectedObjectItem}</p>
                  )}
                </div>
                <div className="container-items">
                  <h2>Containers</h2>
                  <select
                    value={selectedContainerItem}
                    onChange={handleContainerSelectChange}
                    className="full-width-select"
                  >
                    <option value="">Select.....</option>
                    {containerItems.map((itemName, index) => (
                      <option key={index} value={itemName}>
                        {itemName}
                      </option>
                    ))}
                  </select>
                  {selectedContainerItem && (
                    <p>Selected: {selectedContainerItem}</p>
                  )}
                </div>
              </div>
              <button onClick={handleRelationItems} className="post-button">
                Relation
              </button>
            </div>
          )}
        </div>
        <button className="toggle-button" onClick={toggleDropdown}>
          Dropdown
        </button>
      </div>
    </div>
  );
}

export default ItemDropdown;
