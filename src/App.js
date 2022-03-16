import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState("");

  const url = process.env.REACT_APP_BASE_URL.replace('location', location);

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((response) => {
      setData(response.data);
      // console.log(response.data);
    })
    setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input 
          type="text" 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDownCapture={searchLocation}
          placeholder="Enter Location"
        />
      </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {
                data.main ?
                  <h1>{data.main.temp.toFixed()}&deg;F</h1>
                  : null
              }
            </div>
            <div className="description">
              {!!data.weather && <p>{data.weather[0].main}</p>}
            </div>
          </div>

          {
            data.name !== undefined ? <div className="bottom">
              <div className="feels">
                {
                  data.main ?
                    <p className="bold">{data.main.feels_like.toFixed()}&deg;F</p>
                    : null
                }
                <p>Feels like</p>
              </div>

              <div className="humidity">
                {
                  data.main ?
                    <p className="bold">{data.main.humidity}%</p>
                    : null
                }
                <p>Humidity</p>
              </div>

              <div className="wind">   
              {
                  data.wind ?
                        <p className="bold">{data.wind.speed}MPH</p>
                    : null
                }           
                <p>Wind Speed</p>
              </div>
          </div>: null
          }
          </div>
          
    </div>
  );
}

export default App;
