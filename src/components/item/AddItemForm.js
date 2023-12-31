
import React, { useState, useRef, useEffect } from 'react';
import './additemstyle.css';


const AddItemForm = ({ user }) => {
  const [item, setItem] = useState({ user_id: '', item_name: '', description: '', item_type: '' });
  const [Items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const postFieldsRef = useRef(null);

  useEffect(() => {
    console.log('User prop in AddItemForm:', user);

    if (user) {
      setItem((prevItem) => ({ ...prevItem, user_id: user.username }));
    }
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const callAPI = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      };

      const response = await fetch('https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user', requestOptions);

      if (response.status === 200) {
        const data = await response.json();
        setItems(data);
        setError(null);
        clearInputFields();
      } else {
        setError(`Error: ${response.statusText}`);
      }
    } catch (error) {
      setError('An error occurred while posting the item.');
      console.error('Error:', error);
    }
  };

  const clearInputFields = () => {
    setItem({ user_id: user ? user.username : '', item_name: '', description: '', item_type: '' });
  };

  return (
    <div>
      <div className="container">

       
        <br />

        <div ref={postFieldsRef}>
          <input
            type="text"
            name="item_name"
            placeholder="Item Name"
            value={item.item_name}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={handleInputChange}
            className="input"
          />
          <select
            name="item_type"
            value={item.item_type}
            onChange={handleInputChange}
            className="input"
          >
            <option value="">Select Item Type</option>
            <option value="container">Container</option>
            <option value="object">Object</option>
          </select>
          <button onClick={callAPI} className="button">
            <i className="bi bi-send-fill"></i>
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AddItemForm;

