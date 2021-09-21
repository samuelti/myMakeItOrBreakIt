import React, { useState, useEffect } from "react";
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { useMutation } from "@apollo/client";
import { SAVE_STOCK } from "../utils/mutations";
import { saveTickers, getSavedTickers } from '../utils/localStorage';
import Auth from '../utils/auth';
import { searchStocksQuery } from '../utils/API';

 
const SearchStocksForm = () => {

    // create state for holding returned google api data

    const [searchedStocks, setSearchedStocks] = useState([]);

    // create state for holding our search field data

    const [searchInput, setSearchInput] = useState('');

    // create state to hold saved bookId values

    const [savedTickers, setSavedTickers] = useState(getSavedTickers());

    // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount

    // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup

    useEffect(() => {
        return () => saveTickers(savedTickers);
    });

    const [saveStock, { error }] = useMutation(SAVE_STOCK);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const queryRes = await searchStocksQuery(searchInput);
            console.log('queryRes: ', queryRes);
            if (!queryRes.ok) {
                throw new Error('something went wrong!');
            }
            const queryResJson = await queryRes.json();
            const items = queryResJson.results;
            console.log('items: ', items);

            const stockData = items.map((stockRes) => ({
                ticker: stockRes.ticker,
                name: stockRes.name,
            }));

            console.log('stockData: ', stockData);
            setSearchedStocks(stockData);
            setSearchInput('');

        } catch (err) {
            console.error(err);
        }
    };

    // create function to handle saving a book to our database

    const handleSaveStock = async (ticker) => {

        // find the book in `searchedBooks` state by the matching id

        const stockToSave = searchedStocks.find((stock) => stock.ticker === ticker);

        // get token

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await saveStock({
                variables: { stockData: stockToSave }
            })
            setSavedTickers([...savedTickers, stockToSave.ticker]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <h2>Search Stock</h2>
            <Form onSubmit={handleFormSubmit}>
                <Form.Control
                    name="searchInput"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    placeholder="Search for company name or ticker symbol"
                />
                <Button type="submit" variant="success" size="lg">
                    Search Stock
                </Button>
            </Form>
            <CardColumns>
                {searchedStocks.map((stock) => {
                    return (
                        <Card key={stock.ticker} border='dark'>
                            <Card.Body>
                                <Card.Title>{stock.ticker}</Card.Title>
                                <Card.Text>{stock.name}</Card.Text>
                                {Auth.loggedIn() && (
                                    <Button
                                        disabled={savedTickers?.some((savedTicker) => savedTicker === stock.ticker)}
                                        className='btn-block btn-info'
                                        onClick={() => handleSaveStock(stock.ticker)}>
                                        {savedTickers?.some((savedTicker) => savedTicker === stock.ticker)
                                            ? 'This stock has already been saved!'
                                            : 'Save this Stock!'}
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    );
                })}
            </CardColumns>
        </>
    );
}

 

export default SearchStocksForm;