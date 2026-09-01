import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Navbar from "./components/Navbar.jsx";
import AddNotes from "./components/AddNotes.jsx";
import List from "./components/List.jsx";
import View from "./components/View.jsx";
import UpdateNotes from "./components/UpdateNotes.jsx";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={<List />}
                />
                <Route
                    path="/add"
                    element={<AddNotes />}
                />
                <Route
                    path="/view/:id"
                    element={<View />}
                />
                <Route
                    path="/update/:id"
                    element={<UpdateNotes />}
                />
            </Routes>
        </>
    );
}
export default App;