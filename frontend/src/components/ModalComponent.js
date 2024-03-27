import "../styles/modalStyles.css";
import { addItem, addNumbers, addFees } from "../services/api";
import React, { useEffect } from "react";
 
 
const ModalComponent = ({ isOpen, closeModal, listType, refreshList }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Limpiar el event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);
 
  const handleKeyPress = (e) => {
    // Expresión regular que permite números y punto (para decimales)
    const regex = /^[0-9.]+$/;
  
    if (!regex.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }
  };



  // Manejar clic fuera de la modal
  const handleBackdropClick = (event) => {
    if (event.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData;

    try {
      if (listType === "A") {
        formData = {
          itemNumber: e.target.itemNumber.value,
          name: e.target.name.value,
          purchasePrice: e.target.purchasePrice.value || undefined,
          soldPrice: e.target.soldPrice.value || undefined,
          notes: e.target.notes.value || undefined,
          retail: e.target.retail.value || undefined,
          monthlyInPurchase: e.target.monthlyInPurchase.value || undefined,
          dateSold: e.target.dateSold.value || undefined,
          site: e.target.site.value || undefined,
        };

        await addItem(formData);
         

        // Opcional: Actualizar el estado/UI con el nuevo elemento
      } else if (listType === "B") {
        formData = {
          spentInItems: e.target.spentInItems.value || undefined,
          totalRetail: e.target.totalRetail.value || undefined,
          percentageRetail: e.target.percentageRetail.value || undefined,
          amountInSales: e.target.amountInSales.value || undefined,
          spentInFees: e.target.spentInFees.value || undefined,
          percentageInFee: e.target.percentageInFee.value || undefined,
          Profit: e.target.Profit.value || undefined,
        };
        await addNumbers(formData);
         

      } else if (listType === "C") {
        formData = {
          invoiceId: e.target.invoiceId.value,
          premium: e.target.premium.value || undefined,
          freight: e.target.freight.value || undefined,
          tax: e.target.tax.value || undefined,
        };

        await addFees(formData);
        

      }
      closeModal();
      refreshList();
    } catch (error) {
      console.error("Error al agregar el elemento:", error);
      // Manejar errores, por ejemplo, mostrar un mensaje al usuario
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <button onClick={closeModal}>Close</button>
        {listType === "A" && (
          <form onSubmit={handleSubmit}>
            <input name="itemNumber" placeholder="ItemNumber" required/>
            <input name="name" placeholder="Name"  required/>
            <input
              name="purchasePrice"
              placeholder="Purchase Price"
              type="text"
              pattern="^\d*(\.\d+)?$"
             
              
              
              onKeyPressUp={handleKeyPress}
            />
            <input
              name="soldPrice"
              placeholder="Sold Price"
              type="number"
              step="0.01"
            />
            <input name="notes" placeholder="Notes"  />
            <input name="retail" placeholder="Retail" type="number" step="0.01" />
            <input
              name="monthlyInPurchase"
              placeholder="Monthly In Purchase"
              type="number"
              step="0.01"
            />
            <input
              name="dateSold"
              placeholder="Date Sold"
              type="date"
              
            />
            <input name="site" placeholder="Site"  />
            <button type="submit">Add</button>
          </form>
        )}
        {listType === "B" && (
          <form onSubmit={handleSubmit}>
            <input
              name="spentInItems"
              placeholder="spentInItems"
              type="number"
              
            />
            <input
              name="totalRetail"
              placeholder="totalRetail"
              type="number"
              
            />
            <input
              name="percentageRetail"
              placeholder="percentageRetail"
              type="number"
              
            />
            <input
              name="amountInSales"
              placeholder="amountInSales"
              type="number"
             
            />
            <input
              name="spentInFees"
              placeholder="spentInFees"
              type="number"
              
            />
            <input
              name="percentageInFee"
              placeholder="percentageInFee"
              type="number"
              
            />
            <input name="profit" placeholder="profit" type="number"/>
            <button type="submit">Add</button>
          </form>
        )}
        {listType === "C" && (
          <form onSubmit={handleSubmit}>
            <input name="invoiceId" placeholder="invoiceId" required />
            <input
              name="premium"
              placeholder="premium"
              type="number "
              step="0.01"
            />
            <input
              name="freight"
              placeholder="freight"
              type="number "
              step="0.01"
            />
            <input name="tax" placeholder="tax" type="number "
              step="0.01"/>
            <button type="submit">Add</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ModalComponent;
