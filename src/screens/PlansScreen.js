import styles from './PlansScreen.module.scss';

function PlansScreen({ plans }) {
  return (
    <div className={styles.plans}>
      {plans.map((plan) => (
        <div className={styles.plan}>
          <div className={styles['plan__info']}>
            <h4>{plan.type}</h4>
            <span>{plan.resolution}</span>
          </div>
          <button
            className={`btn ${styles['subscribe-btn']}`}
            disabled={plan.subscribe}
          >
            {plan.subscribe ? 'Current Plan' : 'Subscribe'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default PlansScreen;
