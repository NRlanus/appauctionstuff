import axios from 'axios';
 


const baseUrl = 'http://localhost:3001/api';

export const fetchItems = async () => {
  try {
    const response = await axios.get(`${baseUrl}/items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error; // O maneja el error como prefieras
  }
  
};

export const fetchNumbersList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/numbers`);
      return response.data;
    } catch (error) {
      console.error('Error fetching other list:', error);
      throw error;
    }
  };

  export const fetchFeesList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/fees`);
      return response.data;
    } catch (error) {
      console.error('Error fetching other list:', error);
      throw error;
    }
  };

  export const addItem = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/add-item`, data);
      return response.data;
      
    } catch (error) {
      throw error;
    }
  };
  export const addNumbers = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/add-numbers`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const addFees = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/add-fees`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateItem = async (id, data) => {
    try {
        const response = await axios.patch(`${baseUrl}/update-item/${id}`, data);
        console.log(data);
        console.log(id);
        return response.data;

    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
};

export const updateFee = async (id, data) => {
  try {
      const response = await axios.patch(`${baseUrl}/update-fees/${id}`, data);
      console.log(data);
      console.log(id);
      return response.data;
      
  } catch (error) {
      console.error('Error updating item:', error);
      throw error;
  }
};
