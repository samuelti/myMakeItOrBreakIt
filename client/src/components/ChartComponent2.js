import React, {useEffect,useState} from 'react';
import { render } from 'react-dom';
import Chart2 from './Chart2';
import { getData } from "../utils/utils"


import { TypeChooser } from "react-stockcharts/lib/helper";

function ChartComponent2 (data) {


    // useEffect(()=>{
    //   getData().then(data => {
    //         console.log(data)
	// 		setChartData({ data })
	// 	})  
    // }) 
    console.log(data); 
    console.log(data.length);  
    console.log(data.data.length);
    if (data == null || data.data.length == 0) {
        return (<div>Loading...</div>);
    }
	
    
	return(
	
		
		<Chart2 data = {data.data} />
			
		
	)
}

export default ChartComponent2;