
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SearchBar from '../search/SerchItem';
import EditModal from '../EditItem/EditItem.js';
import './itemliststyles.css';
import './DeleteItemStyle.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ItemList({ user }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [deletedItem, setDeletedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadItems();
  }, [user]);

  function loadItems() {
    const apiUrl = `https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/user?user_id=${user.username}`;
    
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setItems(JSON.parse(data.body));
        } else {
          throw new Error("Error loading items");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  const openEditModal = (itemData) => {
    setSelectedItemData(itemData);
    setIsEditModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  const deleteItem = (item_name) => {
    const apiUrl = `https://k2zguvcin7.execute-api.ap-south-1.amazonaws.com/dev/deleteitem?user_id=${user.username}&item_name=${item_name}`;
  
    console.log('Delete API URL:', apiUrl);
  
    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          console.log('Item deleted successfully');
          setDeletedItem(item_name);
          setTimeout(() => {
            setDeletedItem(null);
            loadItems();
          }, 1000);
        } else {
          throw new Error('Error deleting item');
        }
      })
      .catch(error => {
        console.error('Error deleting item:', error.message);
        alert('Error deleting item: ' + error.message);
      });
  };
  

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} className="search-button" />
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Description</th>
            <th>Item Type</th>
            <th> </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter((item) =>
              item.item_name.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((item) => (
              <tr key={item.item_name}>
                <td>
                  <Link
                    to={{ pathname: `/items/${item.item_name}`, state: { item } }}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {item.item_name}
                  </Link>
                </td>
                <td>{item.description}</td>
                <td
                  className="tooltip"
                  style={{
                    display: "inline-block",
                    alignItems: "center",
                    lineHeight: "30px",
                  }}
                >
                  {item.item_type === "object" ? (
                    <i
                      className="bi bi-box"
                      style={{
                        marginRight: "5px",
                        border: "none",
                        borderRadius: "0",
                      }}
                    ></i>
                  ) : item.item_type === "container" ? (
                    <i
                      className="bi bi-bag-fill"
                      style={{
                        marginRight: "5px",
                        border: "none",
                        borderRadius: "0",
                      }}
                    ></i>
                  ) : null}
                  <span className="tooltiptext">
                    {item.item_type === "object"
                      ? "Object"
                      : item.item_type === "container"
                      ? "Container"
                      : "Unknown"}
                  </span>
                </td>
                <td>
                  <button onClick={() => openEditModal(item)}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteItem(item.item_name)}
                    onMouseEnter={() => setHoveredItem(item.item_name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={
                      deletedItem === item.item_name
                        ? "shake"
                        : hoveredItem === item.item_name
                        ? "blink"
                        : ""
                    }
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {deletedItem && (
        <div className="delete-animation">
          Item "{deletedItem}" deleted successfully!
        </div>
      )}
      {isEditModalVisible && (
        <div className="modal active" id="editModal">
          <div className="modal-content">
            <EditModal
              selectedItemData={selectedItemData}
              hideEditModal={closeEditModal}
              loadItems={loadItems}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemList;
