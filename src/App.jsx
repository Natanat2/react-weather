import React, { useEffect, useState } from 'react';
import './styles/App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CitySelector from './components/CityCelector';
import WeatherTable from './components/WeatherTable';
import ViewSelector from './components/ViewSelector';
import Spinner from 'react-bootstrap/Spinner';

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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const city = selectedCity;
        const country = cities[city];

        const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=ru&appid=${apiKey}&units=metric`);
        const forecastRes = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&lang=ru&appid=${apiKey}&units=metric`);
        
        setWeather(weatherRes.data);
        setForecast(forecastRes.data.list.filter((_, index) => index % 8 === 0));
        setLoaded(true);
        setError(null);
      } catch (err) {
        setError('Не удалось получить данные');
        setLoaded(true);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  if(!loaded) {
    return (
      <>
        <div className='loading'>
          Загружаем...<Spinner animation="border" variant="info" />
        </div>;
      </>
    );
  }

  if(error) {
    return <div>{error}</div>;
  }

  return (
    <div className='App'>
      <CitySelector cities={cities} selectedCity={selectedCity} onSelectCity={setselectedCity} />
      <ViewSelector view={view} onSelectView={setView} />
      <div className='container table-container'>
        <WeatherTable data={view === 'current' ? weather : forecast} view={view} />
    </div>
  </div>
  );
}

export default App;
