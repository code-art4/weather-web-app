import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from "react-spinkit";
import { Modal } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState([])
  const [location, setLocation] = useState("");
  const [url, seturl] = useState(process.env.REACT_APP_WEATHER_URL);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  //by default Lagos
  const [country, setCountry] = useState()
  const togglePopup = () => setShow(!show);

  //to use the user location
  const [geoPosition, setGeoPosition] = useState()
  
  // const url = process.env.REACT_APP_WEATHER_URL;
  
  // const url = process.env.REACT_APP_BASE_URL.replace('location', location);
  
  // const searchLocation = (event) => {
  //   if(event.key === 'Enter'){
  //     setData('loading');
  //     axios.get(url).then((response) => {
  //     setData(response.data);
  //   }).catch(setData('error'))
  //   setLocation('')
  //   }
  // }

  useEffect(() => {
    togglePopup();
  }, [])


  const changeLocation = (e) => {
    seturl(process.env.REACT_APP_WEATHER_URL.replace('Lagos', e.target.value));
    setErrorMessage('Please put off your location');
  };


  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  
  function success(pos) {
    var crd = pos.coords;
    
    console.log('Your current position is:');
    
    let geoPositionURL = process.env.REACT_APP_WEATHER_URL_GEOPOSITION.replace(
      '{lat}',
      crd.latitude
    );
    geoPositionURL = geoPositionURL.replace(
      '{lon}',
      crd.longitude
      );
      seturl(geoPositionURL)
    
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  

  useEffect(() => {
     axios
      .get(url)
      .then((response) => {
        // console.log(response.data.list[0].dt_txt);
        const filtered = response.data.list;     
        const d = [];
        const a = filtered.map(el => {          
          return {...el, dt_txt: el.dt_txt.replace(el.dt_txt, new Date(el.dt_txt).getDay())};          
        })
        setData(a);       
        setCountry(response.data.city.name)   
      }).catch(setData('error'))
    setLocation('');
    
  },[url])

  useEffect(() => {
    const n = navigator.geolocation.getCurrentPosition(success, error, options);
    console.log(n);
  }, [])

  const dayOfWeek = (dayNumber) => {
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const x = Number(dayNumber);
    return weekdays[x];
  }

  const getUnique = (arr, comp) => {
    return arr.map(el => el[comp]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => arr[e]).map(e => arr[e])
  }

let dt =
  data &&
  data[data.length - 1] &&
  data[data.length - 1].dt_txt &&
  getUnique(data, 'dt_txt');

  dt =
    data &&
    data[data.length - 1] &&
    data[data.length - 1].dt_txt &&
    dt.sort(function (a, b) {
      return a.dt - b.dt;
    });

  return (
    <div className='app'>
      <div className='location-container'>
        <div className='top'>
          <div className='location'>
            <p>{country}</p>
            <p className='change'>Change location</p>
            <select
              name='location'
              id='location'
              className='select'
              onClick={changeLocation}
            >
              <option value='Lagos'>Lagos</option>
              <option value='Abuja'>Abuja</option>
              <option value='London'>London</option>
              <option value='Los Angeles'>Los Angeles</option>
              <option value='Paris'>Paris</option>
            </select>
          </div>
          <div className='temp'>
            {/* data[0].main.temp.toFixed() */}
            {dt && dt && dt[0] && dt[0].main ? (
              <h1>{dt[0].main.temp.toFixed()}&deg;F</h1>
            ) : null}
            <div className='description'>
              {!!data.weather && <p>{}</p>}Today
            </div>
          </div>
          {dt === 'loading' ? (
            <div className='loading'>
              <Spinner name='folding-cube' color='blue' />
            </div>
          ) : null}
          {dt === 'error' ? <p className='error'>An error occurred</p> : null}
          {errorMessage ? <p className='error error-sm'>{errorMessage}</p> : null}
        </div>

        {dt && dt[0] && dt[0].main && (
          <div className='bottom'>
            {dt.slice(1, 5).map((elmt) => (
              <div className='feels' key={elmt.dt}>
                <div className='feels'>
                  <p>{dayOfWeek(elmt.dt_txt)}</p>
                  <p className='bold'>{elmt.main.temp.toFixed()}&deg;F</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
