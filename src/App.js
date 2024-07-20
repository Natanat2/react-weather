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
  const [forecast, setForecast] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState('current');

  useEffect(() => {
    const fetchWeather = async () => {
      const city = selectedCity;
      const country = cities[city];

      const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=ru&appid=${apiKey}&units=metric`);
      const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&lang=ru&appid=${apiKey}&units=metric`);
      
      setWeather(weatherRes.data);
      setForecast(forecastRes.data.list.filter((_, index) => index % 8 === 0));
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
      <div className='button-group'>
        <ButtonGroup aria-label="City selection">
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
      </div>
      
      <div className='button-group'>
        <ButtonGroup>
          <Button variant={view === 'current' ? 'primary' : 'secondary'} onClick={() => setView('current')}>Сейчас</Button>
          <Button variant={view === 'forecast' ? 'primary' : 'secondary'} onClick={() => setView('forecast')}>Ближайшие 5 дней</Button>
        </ButtonGroup>
      </div>

    <div className='container table-container'>
      {view === 'current' ? (
      <>  
      <h2>Погода сегодня</h2>  
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Город</th>
            <th>Температура (°C)</th>
            <th>Скорость ветра (м/с)</th>
            <th>Общее состояние</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{weather.name}</td>
            <td>{roundedTemp} °C</td>
            <td>{weather.wind.speed} м/с</td>
            <td>{weather.weather[0].description}</td>
          </tr>
        </tbody>
      </Table>
      </>
      ) : (
        <>
        <h2>Прогноз на 5 дней</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Температура (°C)</th>
              <th>Скорость ветра (м/с)</th>
              <th>Общее состояние</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((day, index) => (
              <tr key={index}>
                <td>{new Date(day.dt_txt).toLocaleDateString()}</td>
                <td>{Math.round(day.main.temp)} °C</td>
                <td>{day.wind.speed}</td>
                <td>{day.weather[0].description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </>
      )}
    </div>
  </div>
  );
}

export default App;
