import '../styles/renderLists.css';
import { updateItem,updateFee } from '../services/api';
import React, { useState } from 'react';
import {
  calculateAmountSpentInItems,
  calculateAmountInSales,
  calculateSpentInFees,
  calculateProfit
} from './Calculations'; // Ajusta la ruta según corresponda


export const ListItems = ({ items, refreshList }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleEdit = (index, field, value) => {
    setEditIndex(index);
    setEditField(field);
    setEditValue(value);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleBlur = async () => {
    const itemId = items[editIndex].id; // Asegúrate de que los ítems tengan un 'id'
    const updates = { [editField]: editValue };
  
    try {
      await updateItem(itemId, updates);
     
      setEditIndex(null);
      setEditField('');
      setEditValue('');
      refreshList();
    console.log('Ítem actualizado con éxito') ;
     
  
    
    } catch (error) {
      console.error(error);
    }
  
  };

  const handleKeyDown = async (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Evita el comportamiento por defecto del Enter
    const itemId = items[editIndex].id; // Asegúrate de que los ítems tengan un 'id' o algún identificador único
    
    // Aquí, llamarías a tu función de actualización, que podría ser `updateItem` o la lógica dentro de `handleBlur`
    try {
      // Suponiendo que `updateItem` es una función importada desde tu api.js
      await updateItem(itemId, { [editField]: editValue });
      console.log('Ítem actualizado con éxito');
      refreshList();
      // Aquí puedes implementar cualquier lógica adicional de la UI
      // como actualizar el estado local para reflejar los cambios
    } catch (error) {
      console.error('Error al actualizar el ítem:', error);
      // Manejar errores, por ejemplo, mostrando un mensaje de error en la UI
    }

    // Limpia el estado de edición después de la actualización
    setEditIndex(null);
    setEditField('');
    setEditValue('');
    
  }
};

  return(        
<table>
    <thead>
      <tr>
        <th>Item#</th>
        <th>Name</th>
        <th>Purchase Price</th>
        <th>Sold Price</th>
        <th>Notes</th>
        <th>Retail</th>
        <th>Monthly In Purchase</th>
        <th>Date Sold</th>
        <th>Site</th>
        {/* Añade más encabezados según tus campos */}
      </tr>
    </thead>
    <tbody>
      {items.map((item, index) => (
        <tr key={index}>
        {Object.entries(item).filter(([key, _]) => key !== "id").map(([field, value]) => (
          <td key={field} onDoubleClick={() => handleEdit(index, field, value)}>
            {editIndex === index && editField === field ? (
              <input
                type="text"
                value={editValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              value
            )}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
);
};
  
export const ListNumbers = ({ items, fees }) => {

  
  console.log(items);
  console.log(fees);
  const amountSpentInItems = calculateAmountSpentInItems(items);
  const amountInSales = calculateAmountInSales(items);
  const spentInFees = calculateSpentInFees(fees);
  const profit = calculateProfit(amountInSales, amountSpentInItems, spentInFees);

  return (
    <table>
      <thead>
        <tr>
          <th>Amount Spent in items</th>
          <th>Amount in sales</th>
          <th>Spent in fees</th>
          <th>Profit</th>
        </tr>
      </thead>
      <tbody>
        {/* Solo una fila con los cálculos */}
        <tr>
          <td>{amountSpentInItems.toFixed(2)}</td>
          <td>{amountInSales.toFixed(2)}</td>
          <td>{spentInFees.toFixed(2)}</td>
          <td>{profit.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
};
 
export const ListFees = ({ fees, refreshList }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleEdit = (index, field, value) => {
    setEditIndex(index);
    setEditField(field);
    setEditValue(value);
  };

  const handleChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleBlur = async () => {
    const itemId = fees[editIndex].id; // Asegúrate de que los ítems tengan un 'id'
    const updates = { [editField]: editValue };
  
    try {
      await updateFee(itemId, updates);
     
      setEditIndex(null);
      setEditField('');
      setEditValue('');
      refreshList();
    console.log('Ítem actualizado con éxito') ;
     
  
    
    } catch (error) {
      console.error(error);
    }
  
  };

  const handleKeyDown = async (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Evita el comportamiento por defecto del Enter
    const itemId = fees[editIndex].id; // Asegúrate de que los ítems tengan un 'id' o algún identificador único
    
    // Aquí, llamarías a tu función de actualización, que podría ser `updateItem` o la lógica dentro de `handleBlur`
    try {
      // Suponiendo que `updateItem` es una función importada desde tu api.js
      await updateFee(itemId, { [editField]: editValue });
      console.log('Ítem actualizado con éxito');
      refreshList();
      // Aquí puedes implementar cualquier lógica adicional de la UI
      // como actualizar el estado local para reflejar los cambios
    } catch (error) {
      console.error('Error al actualizar el ítem:', error);
      // Manejar errores, por ejemplo, mostrando un mensaje de error en la UI
    }

    // Limpia el estado de edición después de la actualización
    setEditIndex(null);
    setEditField('');
    setEditValue('');
    
  }
};
return(
    <table>
        <thead>
          <tr>
            <th>InvoiceId</th>
            <th>Premium</th>
            <th>Freight</th>
            <th>Tax</th>
            
            {/* Añade más encabezados según tus campos */}
          </tr>
        </thead>
        <tbody>
      {fees.map((fee, index) => (
        <tr key={index}>
        {Object.entries(fee).filter(([key, _]) => key !== "id").map(([field, value]) => (
          <td key={field} onDoubleClick={() => handleEdit(index, field, value)}>
            {editIndex === index && editField === field ? (
              <input
                type="text"
                value={editValue}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              value
            )}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
</table>
   );
  };
    