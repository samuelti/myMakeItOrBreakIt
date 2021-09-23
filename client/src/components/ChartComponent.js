
import React, {useEffect} from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData } from "../utils/utils"


import { TypeChooser } from "react-stockcharts/lib/helper";

function ChartComponent (data) {

    useEffect(()=>{
    //   getData().then(data => {
    //         console.log(data)
	// 		this.setState({ data })
	// 	})  
    }) 
       
        

        
    
    // if (this.state == null) {
    //     return <div>Loading...</div>
    // }
	

	return(
	
			<TypeChooser>
				{type => <Chart type={type} data={[{x:"open", y: data.open}, {x:'close', y:data.close} ]} />}
			</TypeChooser>
		
	)
}

export default ChartComponent;