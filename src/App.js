import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import SingnUp from './Components/SingnUp';

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SingnUp/>} />
        </Routes>
    </div>
  );
}

export default App;
