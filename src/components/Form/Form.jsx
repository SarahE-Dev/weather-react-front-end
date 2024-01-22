import React, { Component } from 'react'
import './Form.css'
import axios from 'axios'
import Weather from '../Weather/Weather'
import {Slide, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export class Form extends Component {
    state = {
        cityInput: "",
        weatherList: [],
        weatherDisplayed: {},
        displayHidden: true
    }

    async componentDidMount(){
        try {
            const allWeathers = await axios.get("http://localhost:3001/weather/get-all-searched-locations")
            console.log(allWeathers);
            this.setState({weatherList: allWeathers.data.payload})
        } catch (error) {
            console.log(error);
        }
    }

    handleCityOnChange = (e) => {
        this.setState({
            cityInput: e.target.value
        })
    }

    handleOnSubmit = async (event) =>{
        event.preventDefault()
        try {
            if(this.state.cityInput !== ""){
                let newWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityInput}&appid=${'89a0f31643af128d33449223f3e58dfc'}`)
                console.log(newWeather);
                let weatherDisplay = await axios.post('http://localhost:3001/weather/add-location', {
                    location: newWeather.data.name,
                    country: newWeather.data.sys.country,
                    temperature: newWeather.data.main.temp,
                    description: newWeather.data.weather[0].description
                })
                let newArray = [...this.state.weatherList, weatherDisplay.data.payload]
                this.setState({
                    weatherList: newArray,
                    weatherDisplayed: weatherDisplay.data.payload,
                    displayHidden: false 
                })
                
            }
        } catch (error) {
            toast.error('Please enter a correct city.')
        }
        this.setState({
            cityInput: ""
        })
    }

    handleCityOnDelete = async (id) => {
        let deletedWeather = await axios.delete(`http://localhost:3001/weather/delete-location/${id}`)
        let newArray = this.state.weatherList.filter(i=>i._id !== id);
        this.setState({
            weatherList: newArray
        })
    }

    handleWeatherDisplay = (weather) => {
        this.setState({
            weatherDisplayed: weather,
            displayHidden: false
        })
    }

    convertToFahrenheit = (k) => {
        return Math.round((k - 273.15) * 1.8 + 32)
    }

  render() {
    return (
      <div className='outer-container'>
        <div className="form-container">
            <form onSubmit={this.handleOnSubmit} className="form">
                <input onChange={this.handleCityOnChange} value={this.state.cityInput} placeholder='City name' type="text" name="city" id="city" />
                <button type="submit">Get Weather</button>
            </form>
        </div>
        <div className="weather-container">
            <ul>
                {this.state.weatherList.map((item)=>{
                    return (
                       <Weather key={item._id} handleWeatherDisplay={this.handleWeatherDisplay}
                       handleCityOnDelete={this.handleCityOnDelete} 
                       weather={item} /> 
                    )
                })}
            </ul>
        </div>
        <div className={`weather-display-container ${this.state.displayHidden ? "hidden" : ""}`} >
            <h1>{this.state.weatherDisplayed.location}, {this.state.weatherDisplayed.country}</h1>
            <p>Temperature: {this.convertToFahrenheit(this.state.weatherDisplayed.temperature)} °F</p>
            <p>{this.state.weatherDisplayed.description}</p>
        </div>
      </div>
    )
  }
}

export default Form