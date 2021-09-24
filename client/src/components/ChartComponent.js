
import React, {useEffect,useState} from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData } from "../utils/utils"


import { TypeChooser } from "react-stockcharts/lib/helper";

function ChartComponent (data) {

    const [chartData,setChartData] = useState([]);

    useEffect(()=>{
      getData().then(data => {
            console.log(data)
			setChartData({ data })
		})  
    }) 
       
        

        
    
    if (chartData == null) {
        return <div>Loading...</div>
    }
	

	return(
	
			<TypeChooser>
				{type => <Chart type={type} data={[{x:"open", y: chartData.open}, {x:'close', y:chartData.close} ]} />}
			</TypeChooser>
		
	)
}

export default ChartComponent;