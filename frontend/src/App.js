import React, { useState, useEffect } from "react";
import Menu from "./components/Menu";
import { fetchItems,fetchFeesList, updateItem } from "./services/api";
import { ListItems, ListNumbers, ListFees } from "./components/renderLists";

const App = () => {
  const [items, setItems] = useState([]);
  const[fees, setFees] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const refreshList = async() => {
    if (selectedOption === "A") {
      fetchItems().then(data => setItems(data));
    } else if (selectedOption === "B") {
      const[itemsData, feesData] = await Promise.all([fetchItems(),fetchFeesList()]);
      setItems(itemsData);
      setFees(feesData);
    } else if (selectedOption === "C") {
      fetchFeesList().then(data => setFees(data));
    }
  };

  const fetchData = () => {
    fetchItems()
      .then((data) => {
        setItems(data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };
  /*fetchDataForB = () => {
    fetchNumbersList()
      .then((data) => setItems(data)) // Asume que usamos el mismo estado 'items' o puedes usar uno diferente
      .catch((error) => console.error(`Error: ${error}`));
  };*/

  const fetchDataForC = () => {
    fetchFeesList()
      .then((data) => setFees(data)) // Asume que usamos el mismo estado 'fees' o puedes usar uno diferente
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    if (selectedOption === "A") {
      fetchData();
    } else if (selectedOption === "B") {
      //fetchDataForB();
    } else if (selectedOption === "C") {
      fetchDataForC();
    }

    // Aquí podrías agregar más condiciones para otras opciones si las hubiera
  }, [selectedOption]);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };
// En App.js
const handleItemUpdate = async (itemId, updatedFields) => {
  try {
      await updateItem(itemId, updatedFields);
      // Aquí puedes recargar tus ítems o actualizar el estado directamente
      // para reflejar los cambios sin necesidad de recargar.
      refreshList();
  } catch (error) {
      console.error("Error al actualizar el ítem:", error);
  }
};

  return (
    <div>
      <Menu onSelectOption={handleSelectOption} refreshList={refreshList} />
      {selectedOption === "A" && <ListItems items={items} onUpdate={handleItemUpdate} refreshList={refreshList}/>}
      {selectedOption === "B" && <ListNumbers items={items} fees={fees} refreshList={refreshList} />}
      {selectedOption === "C" && <ListFees fees={fees} refreshList={refreshList} />}

    </div>
  );
};

export default App;
