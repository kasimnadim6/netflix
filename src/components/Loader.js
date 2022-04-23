import { SyncLoader } from 'react-spinners';
import styles from './Loader.module.scss';

function Loader() {
  return (
    <div className={styles.loader}>
      <SyncLoader color="#e50815" size={10} />
    </div>
  );
}

export default Loader;
