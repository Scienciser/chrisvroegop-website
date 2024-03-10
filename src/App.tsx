import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Wrapper from "./components/Wrapper";


function App() {
  return (
    <HashRouter>
    <Routes>
        <Route path="*" element={<Wrapper />}>
        </Route>
    </Routes>
    </HashRouter >
  )
}

export default App
