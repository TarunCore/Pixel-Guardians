import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Encode from './components/Encode'
import Decode from './components/Decode'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{margin:"20px", display:"flex",justifyContent:"center", fontFamily:"Poppins"}}>

      <Home></Home>
    </div>
  )
}

export default App
