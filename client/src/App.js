import { Routes, Route } from 'react-router-dom';
import Login from './login_component/Login';
import Register from './login_component/Register';
import LandingPage from './login_component/LandingPage';
import "./login_component/style.css";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/landingpage' element={ <LandingPage /> } />
      </Routes>
    </>
  );
}

export default App;
