import {
  faMagnifyingGlass,
  faSpinner,
  faTruckMedical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo-transparent-svg.svg";
import noResultsImage from "../assets/undraw_search-engines_k649.svg";
import { useEffect, useState } from "react";
import axios from "axios";

const Movies = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(faTruckMedical);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(
    location.state?.searchQuery || ""
  );

  function onSearch() {
    fetchMovies(searchQuery);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      onSearch();
    }
  }

  async function fetchMovies(query) {
    if (!query) {
      setMovies([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=d58ad39d&s=${query}`
    );
    setMovies(data.Search || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchMovies(searchQuery);
  }, []);

  function filterMovies(filter) {
    if (filter === "LOW_TO_HIGH") {
      setMovies(movies.slice().sort((a, b) => a.Year - b.Year));
    }
    if (filter === "HIGH_TO_LOW") {
      setMovies(movies.slice().sort((a, b) => b.Year - a.Year));
    }
  }

  return (
    <>
      <section id="landing">
        <nav>
          <div className="nav__links--wrapper">
            <figure
              className="nav__logo--wrapper click"
              onClick={() => navigate("/")}
            >
              <img src={logo} alt="" className="nav__logo--img" />
            </figure>
            <ul className="nav__links">
              <li className="nav__link">
                <Link to="/">Home</Link>
              </li>
              <li className="nav__link">
                <a href="#">Movies</a>
              </li>
            </ul>
          </div>
          <div className="nav__content">
            <h1 className="nav__title">Browse movies</h1>
            <div className="nav__input--wrapper">
              <input
                type="text"
                placeholder="Search by Title"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="nav__btn--wrapper click" onClick={onSearch}>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="nav__btn"
                />
              </div>
            </div>
          </div>
        </nav>
      </section>
      <section id="search">
        <div className="search__content--wrapper">
          <h1 className="search__title">Search results:</h1>
          <select
            id="filter"
            defaultValue="Sort"
            onChange={(event) => filterMovies(event.target.value)}
          >
            <option value="Sort" disabled>
              Sort
            </option>
            <option value="LOW_TO_HIGH">Year, Low to High</option>
            <option value="HIGH_TO_LOW">Year, High to Low</option>
          </select>
        </div>
        <div className="movies">
          {loading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              className="movies__loading--spinner"
            />
          ) : movies.length > 0 ? (
            <div className="movies__wrapper click">
              {movies.map((movie) => (
                <div 
                className="movie" 
                key={movie.imdbID}
                onClick={() => navigate(`/movies/${movie.imdbID}`)}
                >
                  <img
                    className="movie__poster"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                  <h3 className="movie__title">{movie.Title}</h3>
                  <p className="movie__rating">Year: {movie.Year}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <img
                src={noResultsImage}
                alt="No results found"
                className="no-results__img"
              />
              <h2>No Results, please try again</h2>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Movies;
