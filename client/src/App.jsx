import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Watch from "./Pages/Watch";
import Login from "./Pages/Login";
import {
  Routes,
  Route,
  Redirect as RouterRedirect
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <>

    <div>
      <h1>Hello world</h1>
    </div>
      <Routes>
        <Route exact path="/">
          {user ? <Home /> : <RouterRedirect to="/register" />}
        </Route>
        <Route  path="/register">
          {!user ? <Register /> : (<RouterRedirect to="/" />)}
        </Route>
        <Route path="/login">{!user ? <Login /> : <RouterRedirect to="/" />}</Route>
        {user && (
          <>
            <Route path="/movies">
              <Home type="movie" />
            </Route>
            <Route path="/series">
              <Home type="series" />
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
          </>
        )}
      </Routes>
    </>
  );
};

export default  App;