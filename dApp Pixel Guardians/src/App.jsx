import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import AppBar from './components/Appbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{fontFamily:"Poppins", color:"white", background:"black", padding:"30px"}}>  
      <AppBar></AppBar>
      <Home></Home>
    </div>
  )
}

export default App
