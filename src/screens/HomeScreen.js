import request from '../Request';
import Banner from '../components/Banner';
import styles from './HomeScreen.module.scss';
import Nav from '../components/Nav';
import Row from '../components/Row';
import { useSelector } from 'react-redux';
import { selectSubscription } from '../features/subscriptionSlice';

const HomeScreen = () => {
  const subscription = useSelector(selectSubscription);

  return (
    subscription?.name && (
      <div className={styles['home-screen']}>
        <Nav />
        <Banner />
        <Row
          title="NETFLIX ORIGINALS"
          fetchUrl={request.fetchNetflixOriginals}
          isLargeRow
        />
        <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
        <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
        <Row title="Documentaries" fetchUrl={request.fetchDocumentaries} />
      </div>
    )
  );
};

export default HomeScreen;
