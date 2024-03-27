
  // Calcula la suma de los PurchasePrice de una lista de items
export const calculateAmountSpentInItems = (items) => {
    console.log("ITEMS: ",items);
    return items.reduce((acc, item) => acc + Number(item.PurchasePrice || 0), 0);
  };
  
  // Calcula la suma de los SoldPrice de una lista de items
  export const calculateAmountInSales = (items) => {
    return items.reduce((acc, item) => acc + Number(item.SoldPrice || 0), 0);
  };
  
  // Calcula la suma de los Premium, Freight y Tax de una lista de fees
  export const calculateSpentInFees = (fees) => {
    console.log("FEES: ",fees);
    return fees.reduce((acc, fee) => acc + Number(fee.Premium || 0) + Number(fee.Freight || 0) + Number(fee.Tax || 0), 0);
  };
  
  // Calcula el beneficio
  export const calculateProfit = (amountInSales, amountSpentInItems, spentInFees) => {
    return amountInSales - (amountSpentInItems + spentInFees);
  };
  