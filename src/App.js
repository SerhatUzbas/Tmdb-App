import { useContext } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import MainContent from "./Components/MainContent";
import Movie from "./Components/Main/Movie";
import Mylist from "./Components/Mylist";
import NotFound from "./Components/NotFound";
import AuthContext from "./Store/Context";
function RequireAuth(props) {
  const AuthCtx = useContext(AuthContext);

  let location = useLocation();

  if (!AuthCtx.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/Login' state={{ from: location }} replace />;
  }

  return props.children;
}

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to='/Login' />} />
        <Route path='/Login' element={<Login />} />
        <Route
          path='/Home'
          element={
            <RequireAuth>
              <MainContent />
            </RequireAuth>
          }
        >
          <Route path='/Home/Mylist' element={<Mylist />} />
          <Route path=':movieId' element={<Movie />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
