import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";
import Account from "./Components/Account/Account";
import NewPost from "./Components/NewPost/NewPost";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="App">
      {isAuthenticated && <Header />}

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Login />}
        ></Route>
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        ></Route>
        <Route
          path="/newpost"
          element={isAuthenticated ? <NewPost /> : <Login />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
