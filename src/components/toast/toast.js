import React, { useState, useEffect } from 'react';

import './toast.css';

const Toast = ({ children, displayFor = 5000, clearMessage, ...props }) => {
  const [timeLeft, setTimeLeft] = useState(true);

  // Reset the timer if either children or the amount of time changes
  useEffect(() => {
    setTimeLeft(true);

    const timer = setTimeout(() => {
      setTimeLeft(false);

      // Signal to parent to clear the message
      clearMessage();
    }, displayFor);

    return () => {
      clearTimeout(timer);
    };
  }, [displayFor, children]);

  // Don't render anything if there is nothing (children) to show or if
  // the timer has run out.
  if (!timeLeft || children === null) {
    return null;
  }

  return (
    <div className="toast" {...props}>
      {children}
    </div>
  );
};

export default Toast;
