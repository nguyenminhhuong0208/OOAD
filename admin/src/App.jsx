import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Admin from './pages/Admin/Admin';
import Sidebar from './components/Sidebar/Sidebar'
{/*giao diện web */}
const App = () => {
  return (
    <div>
      <Navbar/>
      <Admin/>
    </div>
  )
}

export default App