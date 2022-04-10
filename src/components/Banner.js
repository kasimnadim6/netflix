import styles from './Banner.module.scss';
import axios from '../axios';
import requests from '../Request';
import { useEffect, useState } from 'react';

const Banner = () => {
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      return response;
    };
    fetchData();
  }, []);
  const truncate = (string, limit) => {
    return string?.length > limit
      ? `${string.substring(0, limit - 1)}...`
      : string;
  };
  return (
    movie && (
      <header
        className={styles.banner}
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      >
        <div className={styles['banner__content']}>
          <h1 className={styles['banner__title']}>
            {movie?.name || movie?.title || movie?.original_name}
          </h1>
          <div className={styles['banner__buttons']}>
            <button className={`${styles.btn}`}>Play</button>
            <button className={`${styles.btn}`}>My List</button>
          </div>
          <h2 className={styles['banner__description']}>
            {truncate(movie?.overview, 150)}
          </h2>
        </div>
        <div className={styles['fade-out']} />
      </header>
    )
  );
};

export default Banner;
