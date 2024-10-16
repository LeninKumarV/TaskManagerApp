import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import SingnUp from './Components/SingnUp';
import Home from './Components/Home';

function App() {
  return (
    <div className="App container">
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SingnUp/>} />
        </Routes>
    </div>
  );
}

export default App;
