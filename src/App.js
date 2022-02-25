import React, { useState } from 'react';
import axios from 'axios';


function App() {

  // const url = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=1ee3fa6552c3ceddeb7cf905b19a4088"

  return (
    <div className="app">
        <div className="container">
          <div className="top">
            <div className="location">
              <p>Dallas</p>
            </div>
            <div className="temp">
              <h1>60&deg;F</h1>
            </div>
            <div className="description">
              <p>Clouds</p>
            </div>
          </div>
          <div className="bottom">
            <div className="feels">
              <p>65&deg;F</p>
            </div>

            <div className="humidity">
              <p>20%</p>
            </div>

            <div className="wind">
              12 MPH
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
