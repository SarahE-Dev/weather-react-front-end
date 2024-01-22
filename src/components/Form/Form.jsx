import React, { Component } from 'react'
import './Form.css'
import axios from 'axios'
import Weather from '../Weather/Weather'

export class Form extends Component {
    state = {
        cityInput: "",
        weatherList: [],
        weatherDisplayed: {}
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
                console.log(newWeather.data.weather[0].description);
                let weatherDisplay = await axios.post('http://localhost:3001/weather/add-location', {
                    location: newWeather.data.name,
                    country: newWeather.data.sys.country,
                    temperature: newWeather.data.main.temp,
                    description: newWeather.data.weather[0].description
                })
                console.log(weatherDisplay);
                let newArray = [...this.state.weatherList, weatherDisplay.data.payload]
                this.setState({
                    weatherList: newArray,
                    weatherDisplayed: weatherDisplay
                })
                
            }
        } catch (error) {
            console.log(error);
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

    handleWeatherDisplay = (id) => {
        
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
                       <Weather key={item._id}
                       handleCityOnDelete={this.handleCityOnDelete} 
                       weather={item} /> 
                    )
                })}
            </ul>
        </div>
      </div>
    )
  }
}

export default Form