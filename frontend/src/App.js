import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import { Routes,Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/User';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser())

  },[])
  const {isAuthenticated}=useSelector(state=>state.user);

  return (
    <div className="App">
      {
        isAuthenticated && <Header/>
      }
      
      <Routes>
        <Route path='/' element={isAuthenticated?<Home/>:<Login/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
