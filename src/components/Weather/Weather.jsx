import React, { Component } from 'react'
import './Weather.css'


export class Weather extends Component {
  
  render() {
    const {description, country, location, temperature, _id} = this.props.weather
    const {handleCityOnDelete, handleWeatherDisplay} = this.props
    return (
      <div className='weather-div'>
        {
          <li><a onClick={()=>handleWeatherDisplay(this.props.weather)} >{location}</a> , {country}</li>
        }
          <button onClick={()=>handleCityOnDelete(_id)} >Delete</button>
      </div>
    )
  }
}

export default Weather