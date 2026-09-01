import { Routes,Route } from 'react-router-dom'
import './styles/App.css'
import Navbar from './components/Navbar'
import AddNotes from './components/AddNotes'
import List from './components/List'

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/add" element={<AddNotes />} />
      </Routes>
    </>
  )
}

export default App;
