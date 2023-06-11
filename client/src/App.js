import { Routes, Route } from 'react-router-dom';
import Login from './login_component/Login';
import Register from './login_component/Register';
import LandingPage from './login_component/LandingPage';
import { Error404 } from './login_component/Error404';
import "./login_component/style.css";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/landingpage' element={ <LandingPage /> } />
        <Route path='*' element={ <Error404 /> } />
      </Routes>
    </>
  );
}

export default App;
