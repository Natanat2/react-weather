import React from "react";
import Table from "react-bootstrap/Table";

const WeatherTable = ({ data, view }) => {
  if (view === 'current') {
    const { name, main, wind, weather } = data;

    if (!main || !wind || !weather || weather.length === 0) {
      return <div>Данные о текущей погоде недоступны</div>;
    }

    return (
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
              <td>{name}</td>
              <td>{Math.round(main.temp)} °C</td>
              <td>{wind.speed} м/с</td>
              <td>{weather[0].description}</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  } else {
    if (!Array.isArray(data) || data.length === 0) {
      return <div>Прогноз недоступен</div>;
    }

    return (
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
            {data.map((day, index) => {
              if (!day.main || !day.wind || !day.weather || day.weather.length === 0) {
                return (
                  <tr key={index}>
                    <td colSpan="4">Недоступны данные</td>
                  </tr>
                );
              }
              return (
                <tr key={index}>
                  <td>{new Date(day.dt_txt).toLocaleDateString()}</td>
                  <td>{Math.round(day.main.temp)} °C</td>
                  <td>{day.wind.speed}</td>
                  <td>{day.weather[0].description}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
};

export default WeatherTable;
