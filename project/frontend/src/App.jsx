import React from 'react'
import {Route, Routes} from "react-router-dom"
import Home from './farmer/pages/home'

function App() {
  return (
    <Routes>
      {/* farmer Route  */}
      <Route path='/' element={<Home/>}/>
    </Routes>
      
 
    
  )
}

export default App