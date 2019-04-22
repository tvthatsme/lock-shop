import React from 'react';

import './deleteable-pill.css';
import { XIcon } from '../../icons/index.js';

const DeleteablePill = ({ text, handleDelete, ...props }) => {
  return (
    <div className="deleteable-pill" {...props}>
      <span>{text}</span>
      <button
        type="button"
        className="deleteable-pill__button"
        onClick={() => {
          handleDelete(text);
        }}
      >
        <XIcon width={18} height={18} />
      </button>
    </div>
  );
};

export default DeleteablePill;
