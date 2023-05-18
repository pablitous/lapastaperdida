import React, { useState, useEffect } from 'react';
import './alert.css';

const Alert = ({ text, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const getClassNames = () => {
    let classNames = 'alert';

    if (type === 'warning') {
      classNames += ' warning';
    } else if (type === 'error') {
      classNames += ' error';
    } else if (type === 'success') {
      classNames += ' success';
    }

    return classNames;
  };

  return visible ? (
    <div className={getClassNames()}>
      {text}
    </div>
  ) : null;
};

export default Alert;
