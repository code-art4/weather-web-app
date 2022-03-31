import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from "react-spinkit";
import { Modal } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState([])
  const [location, setLocation] = useState("");
  const [show, setShow] = useState(false);
  const togglePopup = () => setShow(!show);

  const info = process.env.REACT_APP_WEATHER_URL;

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

  useEffect(() => {
     axios
      .get(info)
      .then((response) => {
        // console.log(response.data.list[0].dt_txt);
        const filtered = response.data.list;     
        const d = [];
        const a = filtered.map(el => {          
          return {...el, dt_txt: el.dt_txt.replace(el.dt_txt, new Date(el.dt_txt).getDay())};          
        })
        setData(a);          
      }).catch(setData('error'))
    setLocation('')
  },[])

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

  console.log(dt)

  return (
    <div className='app'>
      <p>&lt;</p>
      <div className='location-container'>
        <div className='top'>
          <div className='location'>
            <p>Lagos</p>
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
        </div>

        {dt && dt[0] && dt[0].main && (
          <div className='bottom'>
            {dt.slice(1, 5).map((elmt) => (
              <div className='feels'>
                <div className='feels' key={elmt.dt}>
                  <p>{dayOfWeek(elmt.dt_txt)}</p>
                  <p className='bold'>{elmt.main.temp.toFixed()}&deg;F</p>
                </div>
              </div>
            ))}

            {data.map((el) => {
              if (new Date(el.dt_txt).getDay()) {
                console.log();
              }
            })}
          </div>
        )}
      </div>
      <p>&gt;</p>
    </div>
  );
}

export default App;
