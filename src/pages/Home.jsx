import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-transparent-svg.svg";
import movieImage from "../assets/undraw_movie-night_pkvp.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch() {
    if (searchQuery) {
      navigate("/movies", { state: { searchQuery } });
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <>
      <header className="navbar">
        <div className="nav content-wrapper justify-between align-center">
          <div className="logo__wrapper click" onClick={() => navigate("/")}>
            <img src={logo} alt="" className="logo" />
          </div>
          <div className="links align-center justify-between">
            <Link
              to="/"
              className="link router-link-exact-active router-link-active"
            >
              Home
            </Link>
            <Link to="/movies" className="link">
              Find your Movie
            </Link>
            <a className="btn-contact">Contact</a>
          </div>
        </div>
      </header>
      <section id="landing-page">
        <div className="content-wrapper flex-col align-center justify-between relative">
          <div className="flex flex-col align-center home__content">
            <div className="section__title--wrapper">
              <div className="animation">
                <h1 className="section__title">
                  America's most awarded movie subscription platform
                </h1>
              </div>
            </div>
            <div className="section__description--wrapper">
              <div className="animation">
                <h2 className="description">
                  Find your favorite movie in an{" "}
                  <span className="teal">instant</span>
                </h2>
              </div>
            </div>
            <div className="search--wrapper">
              <div className="animation">
                <div className="input--wrapper">
                  <input
                    type="text"
                    placeholder="Search by Title"
                    className="home__search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button className="not-loading" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <img src={movieImage} alt="" className="movie--img" />
        </div>
      </section>
    </>
  );
};

export default Home;
