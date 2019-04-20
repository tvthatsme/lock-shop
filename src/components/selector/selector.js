import React, { useState, useEffect, useRef } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Selector = ({ items, selectedItem = '', onSelect }) => {
  const selectorRef = useRef(null);
  const inputRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, updateSearch] = useState(selectedItem);

  // Figure out what items match the search query
  const matchingItems = items.filter(item =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  // If the selected item changes from the parent, update the search value
  useEffect(() => {
    updateSearch(selectedItem);
  }, [selectedItem]);

  // If the user stops interacting with the selector, put things back to original
  useOnClickOutside(selectorRef, () => {
    setDropdownOpen(false);
    updateSearch(selectedItem);
  });

  // Update the search field when the user types
  const handleInput = event => {
    updateSearch(event.target.value);
  };

  // Handle the selection of an item
  const handleSelect = id => {
    onSelect(id);
    setDropdownOpen(false);
  };

  // Method to clear the input and re-focus the input field
  const clearInput = () => {
    updateSearch('');
    openDropdown();
    inputRef.current.focus();
  };

  // Method to open the dropdown
  const openDropdown = () => {
    setDropdownOpen(true);
  };

  return (
    <div ref={selectorRef}>
      <input
        ref={inputRef}
        type="text"
        value={search}
        onChange={handleInput}
        onClick={openDropdown}
        onFocus={openDropdown}
      />
      <button type="button" onClick={clearInput}>
        x
      </button>
      {dropdownOpen && (
        <div>
          <ul>
            {matchingItems.map(item => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    handleSelect(item.id);
                  }}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Selector;
