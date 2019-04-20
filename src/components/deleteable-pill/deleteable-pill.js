import React from 'react';

const DeleteablePill = ({ text, handleDelete, ...props }) => {
  return (
    <div {...props}>
      <span>{text}</span>
      <button
        type="button"
        onClick={() => {
          handleDelete(text);
        }}
      >
        x
      </button>
    </div>
  );
};

export default DeleteablePill;
