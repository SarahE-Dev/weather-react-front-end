import React, { Component } from 'react'
import Form from './components/Form/Form'
import './App.css'
import Header from './components/Header/Header'

export class App extends Component {
  render() {
    return (
      <div className='app'>
        <Header/>
        <Form/>
      </div>
    )
  }
}

export default App
