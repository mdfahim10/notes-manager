import { Routes,Route } from 'react-router-dom'
import './styles/App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<h1>Homepage of Notes-manager </h1>} />
        <Route path="/add" element={<h1>Add Notes page </h1>} />
      </Routes>
    </>
  )
}

export default App
