// d58ad39d
// http://www.omdbapi.com/?apikey=d58ad39d&
// http://img.omdbapi.com/?apikey=d58ad39d&

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Movies from './pages/Movies';
import Movie from './pages/Movie';


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies" element={<Movies />}></Route>
        <Route path="/movies/:id" element={<Movie />}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
