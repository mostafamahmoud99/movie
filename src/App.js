import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./AuthContext";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import Movies from "./Components/Movies/Movies";
import Navbar from "./Components/Navbar/Navbar";
import Notfound from "./Components/Notfound/Notfound";
import PeopleDetails from "./Components/PeopleDetails/PeopleDetails";
import Person from "./Components/Person/Person";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Register from "./Components/Register/Register";
import SeriesDetails from "./Components/SeriesDetails/SeriesDetails";
import Tv from "./Components/Tv/Tv";
import { MoviesContextProvider } from "./MoviesContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <MoviesContextProvider>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute>
                  <Movies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tv"
              element={
                <ProtectedRoute>
                  <Tv />
                </ProtectedRoute>
              }
            />
            <Route
              path="/person"
              element={
                <ProtectedRoute>
                  <Person />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="movies/:id" element={<MovieDetails/>}/> 
            <Route path="tv/:id" element={<SeriesDetails/>} />
            <Route path="person/:id" element={<PeopleDetails/>}/>
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
        </MoviesContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
