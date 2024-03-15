import React from 'react'
import Logo from "../assets/logo.png"
const AppBar = () => {
  return (
    <nav >
        <div style={{display:"flex", alignContent:"center"}}>
        <img src={Logo} alt="" style={{height:"60px", filter:"drop-shadow(2px 2px 5px #04D9FF)"}}/>
        <h1 style={{marginTop:0, fontSize:"42px"}}>Pixel Guardians</h1>
        </div>
    </nav>
  )
}

export default AppBar