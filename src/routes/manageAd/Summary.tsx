import styles from './summary.module.scss';

const Summary = () => {
  return (
    <div className={styles.summary}>
      <h2>웹광고_21032199012738</h2>
      <dl>
        <div className={styles.category}>
          <dt>상태</dt>
          <dd>tmp</dd>
        </div>
        <div className={styles.category}>
          <dt>광고 생성일</dt>
          <dd>tmp</dd>
        </div>
        <div className={styles.category}>
          <dt>일 희망 예산</dt>
          <dd>tmp</dd>
        </div>
        <div className={styles.category}>
          <dt>광고 수익률</dt>
          <dd>tmp</dd>
        </div>
        <div className={styles.category}>
          <dt>매출</dt>
          <dd>tmp</dd>
        </div>
        <div className={styles.category}>
          <dt>광고 비용</dt>
          <dd>tmp</dd>
        </div>
      </dl>
      <button type='button'>수정하기</button>
    </div>
  );
};

export default Summary;
