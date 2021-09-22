import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button, Modal,  } from 'react-bootstrap';

import {QUERY_ME} from '../utils/queries'
// import {REMOVE_BOOK } from '../utils/mutations'
import Auth from '../utils/auth';
// import { removeBookId } from '../utils/localStorage';

const SavedStocks = () => {
  const {loading, data} =useQuery(QUERY_ME);
  const [stockInfo, setStockInfo] = useState({
    open:'',
    close:'', 
    volume: '',
    symbol: ''
  })

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userData = data?.me || {};

  const getData = async(tickerId)=>{
    
      let today = new Date();
      let dd = String(today.getDate()-1).padStart(2,'0');
      let mm = String(today.getMonth()+1).padStart(2,"0");
      let yyyy = today.getFullYear();

      fetch(`https://api.polygon.io/v1/open-close/${tickerId}/${yyyy}-${mm}-${dd}?adjusted=true&apiKey=nKFxEPdEetH2tZBgIrqqmMuFAy3goELs`).then((res)=>res.json()).then((data)=>{ 
        console.log(data)
        setStockInfo({
          open: data.open,
          close: data.close,
          volume: data.volume, 
          symbol: data.symbol
        })
 
      });
    
  }
 

 
//     const handleDeleteBook = async (bookId) => {
//     console.log(bookId)
//         const token = Auth.loggedIn() ? Auth.getToken() : null;

//         if (!token) {
//           return false;
//         }

      

//     try {
//       const {data} = await removeBook({variables: {bookId}});

     
//       removeBookId(bookId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

  // if data isn't here yet, say so
  
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedStocks.length
            ? `Viewing ${userData.savedStocks.length} saved ${userData.savedStocks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedStocks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {/* {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null} */}
                <Card.Body>
                  <Card.Title>{book.ticker}</Card.Title>
                  {/* <p className='small'>Authors: {book.authors}</p> */}
                  <Card.Text>{book.name}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => {
                    getData(book.ticker)
                    handleShow()
                  }
                    // handleDeleteBook(userData.savedStocks.ticker)
                    }>
                    View This Stock
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{stockInfo.symbol}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SavedStocks;
