import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";

const Movie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  async function fetchMovie() {
    setLoading(true);
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=d58ad39d&i=${id}`
    );
    setMovie(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchMovie();
  }, [id]);

  return (
    <div className="movie-info__container">
      <div className="movie-info__header">
        <button className="movie-info__back--btn" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1 className="movie-info__title--header">Movie Details</h1>
      </div>
      {loading ? (
        <div className="movie-info__loading">
          <FontAwesomeIcon icon={faSpinner} className="fa-spinner" />
        </div>
      ) : movie ? (
        <div className="movie-info">
          <figure className="movie-info__poster--wrapper">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="movie-info__poster"
            />
          </figure>
          <div className="movie-info__details">
            <h2 className="movie-info__title">{movie.Title}</h2>
            <p>
              <strong>Plot:</strong> {movie.Plot}
            </p>
            <p>
              <strong>Genre:</strong> {movie.Genre}
            </p>
            <p>
              <strong>Actors:</strong> {movie.Actors}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director}
            </p>
            <p>
              <strong>IMDb Rating:</strong> {movie.imdbRating}
            </p>
          </div>
        </div>
      ) : (
        <p>Movie not found.</p>
      )}
    </div>
  );
};

export default Movie;