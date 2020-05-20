import React, { useState, useEffect} from 'react';
import { SideBar,ScrollMenuComponent } from './components/index';
import axios from 'axios';




function App(){
  let [dataWeather, setDataWeather] = useState([]);
  

  useEffect(()=>{

    axios.get('http://localhost:3001/days')
    .then(({data}) =>{
        setDataWeather(data);
       
    })
    .catch((error) => {
        console.log('Error:',error);
    })

},[]);



  return (
    <div className="App">
      <SideBar />
      <ScrollMenuComponent  dataWeather={dataWeather}/>
    </div>
  );
 }

export default App;
