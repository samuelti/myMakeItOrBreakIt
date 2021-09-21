// import React, { useState } from "react";
// import { Form, Button, Alert } from "react-bootstrap";
// import { useMutation } from "@apollo/client";
// import { SAVE_STOCK } from "../utils/mutations";

// const AppleBuyerForm = () => {

// const [saveStock, { error }] = useMutation(SAVE_STOCK);
// const [userFormData, setUserFormData] = useState({stock: ''});
// const [highLow, setHighLow] = useState({
//   high:'',
//   low:''
// })


// const handleInputChange = (event) => {

//  const { name, value } = event.target;
// setUserFormData({ ...userFormData, [name]: value.toUpperCase() });
// };


// const handleFormSubmit = async (event) => {
//     event.preventDefault();
   
// const tickerVal = userFormData.stock;
//       //make call to polygon api for ticker to send stock information to the DB.
//       fetch(`https://api.polygon.io/v3/reference/tickers?ticker=${tickerVal}&active=true&sort=ticker&order=asc&limit=10&apiKey=nKFxEPdEetH2tZBgIrqqmMuFAy3goELs`).then((data)=>data.json()).then((res) => {

//        saveStock({
//         variables: {stockData: {ticker: res.results[0].ticker, name: res.results[0].name}}
//       })

//       let today = new Date();
//       let dd = String(today.getDate()-3).padStart(2,'0');
//       let mm = String(today.getMonth()+1).padStart(2,"0");
//       let yyyy = today.getFullYear();

//       fetch(`https://api.polygon.io/v1/open-close/${res.results[0].ticker}/${yyyy}-${mm}-${dd}?adjusted=true&apiKey=nKFxEPdEetH2tZBgIrqqmMuFAy3goELs`).then((res)=>res.json()).then((data)=>{ 
//         console.log(data)
//         setHighLow({
//           high: data.high,
//           low:data.low
//                });
//       });
    

     
//       })

//       // then the ticker id has to be passed to the other open/close polygon api to get the closing about


      
//         setSavedStockIds([...savedStockIds, stockToSave.stockId]);
     
// };

//   return (
//     <>
//       <Form onSubmit={handleFormSubmit}>
//           <Form.Control
//             type="text"
//             placeholder="Search Stock"
//             name="stock"
//             onChange={handleInputChange}
//             value={userFormData.stock}
//             required
//           />
//         <Button type="submit" variant="success" size="lg">
//          Save Ticker
//         </Button>
//       </Form>
   
//     </>
//   );
// }

// export default AppleBuyerForm;
