// https://api.polygon.io/v2/aggs/ticker/AAPL/prev?adjusted=true&apiKey=iEZF6bXrdMSKE2rzOaPyRc0w3pnv7rSI

 

export const searchStocksPrevClose = (stocksTicker) => {

 

    return fetch(`https://api.polygon.io/v2/aggs/ticker/${stocksTicker}/prev?adjusted=true&apiKey=iEZF6bXrdMSKE2rzOaPyRc0w3pnv7rSI`);

 

};

 

// https://api.polygon.io/v1/meta/symbols/AAPL/company?&apiKey=iEZF6bXrdMSKE2rzOaPyRc0w3pnv7rSI

 

export const searchStocksCompany = (stocksTicker) => {

 

    return fetch(`https://api.polygon.io/v1/meta/symbols/${stocksTicker}/company?&apiKey=iEZF6bXrdMSKE2rzOaPyRc0w3pnv7rSI`);

 

};

 

// https://api.polygon.io/v3/reference/tickers?search=apple&active=true&sort=ticker&order=asc&limit=10&apiKey=iEZF6bXrdMSKE2rzOaPyRc0w3pnv7rSI

 

export const searchStocksQuery = (query) => {

 

    return fetch(`https://api.polygon.io/v3/reference/tickers?search=${query}&active=true&sort=ticker&order=asc&limit=10&apiKey=iEZF6bXrdMSKE2rzOaPyRc0w3pnv7rSI

`);

 

};