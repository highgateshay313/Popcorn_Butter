import { useState } from 'react'
import './App.css'
import DashBoard from  './components/DashBoard/DashBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
         <DashBoard />
      </div>
     
      
    </>
  )
}

export default App
