import React, { Component } from 'react'
import Form from './components/Form/Form'
import './App.css'
import Header from './components/Header/Header'
import { Slide, ToastContainer } from 'react-toastify'

export class App extends Component {
  render() {
    return (
      <div className='app'>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Slide}
        />
        <Header/>
        <Form/>
      </div>
    )
  }
}

export default App
