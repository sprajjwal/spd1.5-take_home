import React, { Component } from 'react';
import Weather from './Weather';
import Mood from './Mood'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zip: '94108',
      data: null,
    }
    this.getData('94108')
    this.getData = this.getData.bind(this);
  }

  async getData(zip=null) {
    zip = zip == null ? this.state.zip : zip;
    const key = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${key}`;

    const r = await fetch(url);
    const data = await r.json();
    this.setState({ data: data })
  }

  handleForm(e) {
    e.preventDefault();

    const { zip } = this.state;
    this.getData(zip);
  }

  renderWeather() {
    const { zip, data } = this.state;

    if (data === null) {
      this.getData(zip);
      return;
    }
    return <Weather data={ data } />
  }

  render() {
    const { data } = this.state
    return (
      <div className="App">
        <form onSubmit={e => this.handleSubmit(e)}>
          <input 
            value={this.state.zip} 
            onChange={e => this.setState({ zip: e.target.value })}
            type="text" 
            pattern="(\d{5}([\-]\d{4})?)"
            placeholder="enter zip"
          />

          <button type="submit">Submit</button>

        </form>
        {this.renderWeather()}
        {data != null ? <Mood  weather={data.weather[0].description} /> : <></>}

      </div>
    );
  }
  
}

export default App;
