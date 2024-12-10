import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigation from './Components/Navigation'
import ContactHeader from './Components/ContactHeader'
import ContactForm from './Components/ContactForm'


function App() {
  

  return ( 
    <>
    <Navigation></Navigation>
    <main className='mainContainer'>
    <ContactHeader></ContactHeader>
    <ContactForm></ContactForm>
    </main>
   

    </>
  )
}

export default App
