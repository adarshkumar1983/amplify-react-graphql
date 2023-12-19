// SmoothScrollForm.jsx
import React, { useRef } from 'react';
import { Link, Element, scroller } from 'react-scroll';
// import './additemstyle.css';

const SmoothScrollForm = ({ formRef, onFormSubmit, onInputChange, item }) => {
  const handleScrollToForm = () => {
    scroller.scrollTo('postFields', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <div>
      <div className="container">
        <br />

        <Link
          to="postFields"
          spy={true}
          smooth={true}
          offset={-50}
          duration={800}
          className="scroll-link"
        >
          Scroll to Form
        </Link>

        <Element name="postFields" className="element" ref={formRef}>
          <div>
            {/* Your form fields here */}
            <input
              type="text"
              name="item_name"
              placeholder="Item Name"
              value={item.item_name}
              onChange={onInputChange}
              className="input"
            />
            {/* ... Add other form fields here */}
            <button onClick={onFormSubmit} className="button">
              Submit
            </button>
          </div>
        </Element>

        {/* Display error messages or other feedback */}
        {item.error && <p className="error">{item.error}</p>}
      </div>
    </div>
  );
};

export default SmoothScrollForm;
