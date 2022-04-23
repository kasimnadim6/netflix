import { useEffect, useState } from 'react';
import db from '../firebase';
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import styles from './PlansScreen.module.scss';
import { selectUser } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubscription } from '../features/subscriptionSlice';
import {
  selectLoadingStatus,
  startLoader,
  stopLoader,
} from '../features/loaderSlice';
import Loader from '../components/Loader';

function PlansScreen() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectLoadingStatus);
  const [products, setProducts] = useState([]);
  const { user } = useSelector(selectUser);
  console.log(user);
  const subscription = useSelector(selectSubscription);

  const loadCheckOutHandler = async (priceId) => {
    dispatch(startLoader());
    const customerDocRef = doc(db, 'customers', user.uid);
    const newColRef = collection(customerDocRef, 'checkout_sessions');
    const docRef = await addDoc(newColRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(error.message);
      }
      if (sessionId) {
        const stripe = await window.Stripe(
          'pk_test_51Kp9aDSA3tfPv2C2KSJi52Zj4fbkKeQgl46UtNmBM8EltxmGGJOIb1KhHS3z9no1yZpW5IhxryDzVe1F3mHmA87600LFjEEPDh'
        );
        dispatch(stopLoader());
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  useEffect(() => {
    dispatch(startLoader());
    const productsRef = collection(db, 'products');
    const activeProductsRef = query(productsRef, where('active', '==', true));
    onSnapshot(activeProductsRef, (snapShot) => {
      const productsData = {};
      snapShot.forEach(async (productDoc) => {
        productsData[productDoc.id] = productDoc.data();
        const pricesRef = collection(productsRef, productDoc.id, 'prices');
        const priceSnapshot = await getDocs(pricesRef);
        priceSnapshot.docs.forEach((price) => {
          productsData[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(productsData);
      dispatch(stopLoader());
    });
  }, [dispatch]);

  return (
    <>
      <div className={styles.plans}>
        {Object.entries(products)?.length > 0 ? (
          Object.entries(products).map(([planId, plan]) => {
            const isCurrentPackage =
              subscription.isSubscribed &&
              plan.name?.toLowerCase().includes(subscription?.name);

            return !isLoading ? (
              <div className={styles.plan} key={planId}>
                <div className={styles['plan__info']}>
                  <h4>{plan.name}</h4>
                  <span>{plan.description}</span>
                </div>
                <button
                  className={`btn ${styles['subscribe-btn']}`}
                  disabled={isCurrentPackage}
                  onClick={() => loadCheckOutHandler(plan.prices?.priceId)}
                >
                  {isCurrentPackage ? 'Current Package' : 'Subscribe'}
                </button>
              </div>
            ) : (
              <div style={{ 'max-height': '100%' }}>
                <Loader />
              </div>
            );
          })
        ) : (
          <p>{Object.entries(products).length}No Plans</p>
        )}
      </div>
    </>
  );
}

export default PlansScreen;
