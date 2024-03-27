import React, { useState } from "react";
import ModalComponent from "./ModalComponent"; // Asegúrate de haber creado este componente

const Menu = ({ onSelectOption, refreshList }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeListType, setActiveListType] = useState("");
  const handleSelectOption = (option) => {
    onSelectOption(option); // Notificar al componente padre qué opción fue seleccionada
    setActiveListType(option); // Establecer qué lista está activa para uso en el formulario de la modal
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={() => handleSelectOption("A")}>Items</button>
      <button onClick={() => handleSelectOption("C")}>Fees</button>
      <button onClick={() => handleSelectOption("B")}>Numbers</button>
      <button onClick={openModal } disabled={activeListType === "B"}>New</button>

      <ModalComponent
        isOpen={isModalOpen}
        closeModal={closeModal}
        listType={activeListType}
        refreshList={refreshList}
      />
    </div>
  );
};

export default Menu;
