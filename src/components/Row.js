import axios from '../axios';
import styles from './Row.module.scss';
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Row({ title, fetchUrl, isLargeRow = false }) {
  const baseUrl = 'https://image.tmdb.org/t/p/original/';
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [videoId, setVideoId] = useState('');

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const movieClickHandler = (movie) => {
    if (selectedMovie === movie?.id) {
      setVideoId(0);
    } else {
      setSelectedMovie(movie?.id);
      movieTrailer(movie?.name || movie?.title || '')
        .then((resp) => {
          if (resp) {
            const urlParams = new URL(resp);
            const param = urlParams.searchParams.get('v');
            setVideoId(param);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    };
    fetchData();
  }, [fetchUrl]);
  return (
    <>
      <div className={styles.row}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.card}>
          {movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <img
                  key={movie.id}
                  className={`${styles.poster} ${
                    isLargeRow && styles['large-poster']
                  }`}
                  src={`${baseUrl}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                  onClick={() => movieClickHandler(movie)}
                />
              )
          )}
        </div>
      </div>
      {videoId && <YouTube videoId={videoId} opts={opts} />};
    </>
  );
}

export default Row;
