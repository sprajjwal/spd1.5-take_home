import React from 'react';

const styles = {
  container: {
    backgroundColor: 'rgb(93, 207, 192)',
    width: '60vh',
  },
  row1: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}
function toKelvin(temp) {
  return (temp * (9 / 5) - 459.67).toFixed(0);
}

function Weather({ data }) {
  const { description } = data.weather[0];
  const { temp, pressure, humidity, temp_min, temp_max } = data.main;
  let min = toKelvin(temp_min);
  let max = toKelvin(temp_max);
  return (
    <div style={styles.container}>
      <div style={styles.row1}>
        <strong><p>{temp}c</p></strong>
        <p>{description}</p>
      </div>
      <div style={styles.row1}>
        <p>{pressure}hPa</p>
        <p>Humidity: {humidity}%</p>
        <p>Min/Max: {min}/{max}</p>
      </div>
    </div>
  );
}


export default Weather;