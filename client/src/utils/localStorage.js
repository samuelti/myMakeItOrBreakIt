export const getSavedTickers = () => {

    const savedTickers = localStorage.getItem('saved_tickers')

        ? JSON.parse(localStorage.getItem('saved_tickers'))

        : [];

 

    return savedTickers;

};

 

export const saveTickers = (tickerArr) => {

    if (tickerArr.length) {

        localStorage.setItem('saved_tickers', JSON.stringify(tickerArr));

    } else {

        localStorage.removeItem('saved_tickers');

    }

};

 

export const removeTicker = (ticker) => {

    const savedTickers = localStorage.getItem('saved_tickers')

        ? JSON.parse(localStorage.getItem('saved_tickers'))

        : null;

 

    if (!savedTickers) {

        return false;

    }

 

    const updatedSavedTickers = savedTickers?.filter((savedTickers) => savedTickers !== ticker);

    localStorage.setItem('saved_tickers', JSON.stringify(updatedSavedTickers));

 

    return true;

};