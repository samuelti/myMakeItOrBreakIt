

import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export function getMSFTData() {
	const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
}

export function getIexData(ticker) {

    const rawFetch = fetch(`https://sandbox.iexapis.com/stable/stock/${ticker}/chart/1m?chartLast=10&token=Tpk_abbacc6e57584a6da579c151542e24c3`)

           .then(response => response.json())

           .then(data => data.map((stock) => ({

                  date: parseDate(stock.date),

                  open: stock.open,

                  close: stock.close,

                  high: stock.high,

                  low: stock.low,

                  volume: stock.volume,

                  dividend: '',

                  percentChange: '',

                  split: '',

                  absoluteChange: '',

     })

           ));

    console.log('getIexData rawFetch: ', rawFetch);

    return rawFetch;

}