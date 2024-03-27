import React, { useState } from 'react';

const EditableField = ({ value, onUpdate, fieldName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleBlur = () => {
    setIsEditing(false);
    onUpdate(fieldName, inputValue); // Envía el nuevo valor al servidor
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Evita el comportamiento por defecto del form
      handleBlur(); // Activa la misma lógica que en onBlur
    }
  };

  return isEditing ? (
    <input
      autoFocus
      type="text"
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <span onClick={() => setIsEditing(true)}>{value}</span>
  );
};
