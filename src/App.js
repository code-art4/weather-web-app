import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from "react-spinkit";
import { Modal } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState("");
  const [show, setShow] = useState(false);
  const togglePopup = () => setShow(!show);

  const url = process.env.REACT_APP_BASE_URL.replace('location', location);

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      setData('loading');
      axios.get(url).then((response) => {
      setData(response.data);
      // console.log(response.data);
    }).catch(setData('error'))
    setLocation('')
    }
  }

  useEffect(() => {
    togglePopup();
  }, [])

  return (
    <div className='app'>      
      <div className='search'>
        <input
          type='text'
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDownCapture={searchLocation}
          placeholder='Enter Location'
        />
      </div>
      <div className='location-container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}&deg;F</h1> : null}
            <div className='description'>
              {!!data.weather && <p>{data.weather[0].main}</p>}
            </div>
          </div>
          {data === 'loading' ? (
            <div className='loading'>
              <Spinner name='folding-cube' color='blue' />
            </div>
          ) : null}
          {data === 'error' ? (
            <p className='error'>The inputted location doesn't exist</p>
          ) : null}
        </div>

        {data.name !== undefined ? (
          <div className='bottom'>
            <div className='feels'>
              {data.main ? (
                <p className='bold'>{data.main.feels_like.toFixed()}&deg;F</p>
              ) : null}
              <p>Feels like</p>
            </div>

            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>

            <div className='wind'>
              {data.wind ? <p className='bold'>{data.wind.speed}MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        ) : null}
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName='modal-90w'
        aria-labelledby='example-custom-modal-styling-title'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-custom-modal-styling-title'>
            Weather app
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This page has an input where location is inputted to see the weather of a the location and if the location doesn't exist, an error would appear so you can input the location correctly
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
