import React, { useEffect, useState } from 'react';
import './styles/App.css';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiKey = '58f0d2bee1a55111ef067d91e6e2dcab';
const cities = {
  Aktobe: 'kz',
  Astana: 'kz',
  Moscow: 'ru'
};

function App() {
  const [selectedCity, setselectedCity] = useState('Aktobe');
  const [weather, setWeather] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      const city = selectedCity;
      const country = cities[city];
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=ru&appid=${apiKey}&units=metric`);
      setWeather(res.data);
      setLoaded(true);
    };

    fetchWeather();
  }, [selectedCity]);

  if(!loaded) {
    return <div>Loading...</div>;
  }

  const roundedTemp = Math.round(weather.main.temp);

  return (
    <div className='App'>
      <ButtonGroup aria-label="Basic example">
        {Object.keys(cities).map((city) => (
          <Button
          key={city}
          variant={selectedCity === city ? 'primary' : 'secondary'}
          onClick={() => setselectedCity(city)}
          >
            {city}
          </Button>
        ))}
      </ButtonGroup>
    <Table striped bordered hover className='App'>
      <thead>
        <tr>
          <th>Город</th>
          <th>Температура (°C)</th>
          <th>Скорость ветра (m/s)</th>
          <th>Общее состояние</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{weather.name}</td>
          <td>{roundedTemp} °C</td>
          <td>{weather.wind.speed} m/s</td>
          <td>{weather.weather[0].description}</td>
        </tr>
      </tbody>
    </Table>
    </div>
  );
}

export default App;
