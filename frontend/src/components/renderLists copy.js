import '../styles/renderLists.css';

export const ListItems = ({ items }) => {

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
          <td>{item.ItemNumber}</td>
          <td >{item.Name}</td>
          <td>{item.PurchasePrice}</td>
          <td>{item.SoldPrice}</td>
          <td>{item.Notes}</td>
          <td>{item.Retail}</td>
          <td>{item.MonthlyInPurchase}</td>
          <td>{item.DateSold}</td>
          <td  >{item.Site}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
};
  
 export const ListNumbers = ({ items }) => (
    <table>
    <thead>
      <tr>
        <th>Spent in items</th>
        <th>Total retail</th>
        <th>60% Retail</th>
        <th>Amount in sales</th>
        <th>Spent in fees</th>
        <th>Percentage in fee</th>
        <th>Profit</th>
        {/* Añade más encabezados según tus campos */}
      </tr>
    </thead>
    <tbody>
      {items.map((item, index) => (
        <tr key={index}>
          <td>{item.SpentInItems}</td>
          <td>{item.TotalRetail}</td>
          <td>{item.PercentageRetail}</td>
          <td>{item.AmountInSales}</td>
          <td>{item.SpentInFees}</td>
          <td>{item.PercentageInFee}</td>
          <td>{item.Profit}</td>
          {/* Añade más celdas según tus campos */}
        </tr>
      ))}
    </tbody>
  </table>
);
 
export const ListFees = ({ items }) => (
        
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
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.InvoiceId}</td>
              <td>{item.Premium}</td>
              <td>{item.Freight}</td>
              <td>{item.Tax}</td>
              
              {/* Añade más celdas según tus campos */}
            </tr>
          ))}
        </tbody>
      </table>
    );