import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import {QUERY_ME} from '../utils/queries'
// import {REMOVE_BOOK } from '../utils/mutations'
import Auth from '../utils/auth';
// import { removeBookId } from '../utils/localStorage';

const SavedStocks = () => {
  const {loading, data} =useQuery(QUERY_ME);
//   const [removeBook] = useMutation(REMOVE_BOOK)

  const userData = data?.me || {};

 

 
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
  console.log(userData);
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
                  {/* <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button> */}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedStocks;
