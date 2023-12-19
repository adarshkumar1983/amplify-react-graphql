
import React, { useState, useEffect } from 'react';
import "./EdititemStyle.css";
import "../itemlist/ItemList.js"

function EditModal({ selectedItemData, hideEditModal, loadItems }) {
  const [updatedItemName, setUpdatedItemName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedItemType, setUpdatedItemType] = useState('');
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    console.log(selectedItemData);
    if (selectedItemData) {
      setUpdatedItemName(selectedItemData.item_name);
      setUpdatedDescription(selectedItemData.description);
      setUpdatedItemType(selectedItemData.item_type);
    }
  }, [selectedItemData]);

  const updateItem = (event) => {
    event.preventDefault();

    const requestBody = {
      user_id: selectedItemData.user_id,  // Add user_id to identify the item uniquely
      item_name: updatedItemName,
      description: updatedDescription,
      item_type: updatedItemType,
    };

    fetch('https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user', {  // Replace with your API Gateway URL and resource path
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          // alert('Item updated successfully');
          if (loadItems) {
            loadItems();
          }
          setChangesMade(false);
          hideEditModal();
        } else {
          throw new Error('Error updating item');
        }
      })
      .catch((error) => {
        alert('Error updating item: ' + error.message);
      });
  };

  const handleBackdropClick = () => {
    if (changesMade) {
      // Save the changes made when clicking on the backdrop
      // You can choose to show a confirmation dialog here
      // and update the selected item's data accordingly
    }

    hideEditModal();
  };

  const handleInputChange = () => {
    setChangesMade(true);
  };

  return (
    <div className="modal" id="editModal" onClick={handleBackdropClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form id="editForm" onSubmit={updateItem}>
          <input
            type="text"
            id="item_name"
            value={updatedItemName}
            onChange={(e) => {
              // setUpdatedItemName(e.target.value);
              handleInputChange();
            }}
          />
          <input
            type="text"
            id="description"
            value={updatedDescription}
            onChange={(e) => {
              setUpdatedDescription(e.target.value);
              handleInputChange();
            }}
          />
          <select
            id="item_type"
            value={updatedItemType}
            onChange={(e) => setUpdatedItemType(e.target.value)}
          >
            <option value="object">Object</option>
            <option value="container">Container</option>
            {/* Add more options as needed */}
          </select>
          <br></br>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
