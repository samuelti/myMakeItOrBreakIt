import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
  Modal,
} from "react-bootstrap";

import { QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

import { REMOVE_STOCK } from "../utils/mutations";

import { removeTicker } from "../utils/localStorage";

import ChartComponent from "./ChartComponent";

import { getMSFTData, getIexData } from "../utils/utils2";

import ChartComponent2 from "./ChartComponent2";


const SavedStocks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeStock] = useMutation(REMOVE_STOCK);
  const [stockInfo, setStockInfo] = useState({
    open: "",
    close: "",
    volume: "",
    symbol: "",
  });
  const [chartData,setChartData] = useState([]);

  const [chart, setChart] = useState({
    open: "",
    close: "",

  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userData = data?.me || {};

  const getData = async (tickerId) => {
    let today = new Date();
    let dd = String(today.getDate() - 1).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    fetch(
      `https://api.polygon.io/v1/open-close/${tickerId}/${yyyy}-${mm}-${dd}?adjusted=true&apiKey=nKFxEPdEetH2tZBgIrqqmMuFAy3goELs`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setChart({
          open: data.open,
          close: data.close,
        })
        setStockInfo({
          open: data.open,
          close: data.close,
          volume: data.volume,
          symbol: data.symbol,
        });
      });
  };

  async function getChartData(ticker)  {
    const data = await getMSFTData();
    console.log("data",data);
    setChartData(data);
  }

  const handleDeleteStock = async (ticker) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    if (!token) {
      return false;
    }
    
    try {
      const { data } = await removeStock({ variables: { ticker } });
      console.log(ticker);

      removeTicker(ticker);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved Stocks!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedStocks.length
            ? `Viewing ${userData.savedStocks.length} saved ${
                userData.savedStocks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {userData.savedStocks.map((book) => {
            return (
              <Card key={book.ticker} border="dark">
                {/* {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null} */}
                <Card.Body>
                  <Card.Title>{book.ticker}</Card.Title>
                  {/* <p className='small'>Authors: {book.authors}</p> */}
                  <Card.Text>{book.name}</Card.Text>
                  <Button
                    className="btn-block btn-primary"
                    onClick={
                      () => {
                        getData(book.ticker);
                        getChartData(book.ticker);
                        handleShow();

                      }
                      // handleDeleteBook(userData.savedStocks.ticker)
                    }
                  >
                    View This Stock
                  </Button>
                  <Button
                    className="btn-block btn-danger"
                    onClick={
                      () => {
                        handleDeleteStock(book.ticker);
                      }
                      // handleDeleteStock(userData.savedStocks.ticker)
                    }
                  >
                    Remove Stock
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
          <p>open: {stockInfo.open}</p>
          <p>close: {stockInfo.close}</p>
          <p>volume traded: {stockInfo.volume}</p>

          <ChartComponent2 data={chartData} />

         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SavedStocks;
