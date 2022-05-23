import { FC } from 'react';
import styles from './summary.module.scss';

import { IAd } from 'types/adList';

interface IProps {
  data: IAd;
}

// ROAS = (해당 광고로부터의 매출 / 광고 비용 ) x 100

const Summary: FC<IProps> = ({ data }) => {
  const status = data.status === 'active' ? '진행중' : '종료';
  const date = data.startDate.slice(0, 10);
  const budget = `${Number(data.budget / 10_000)}만원`;
  const roas = `${data.report.roas}%`;
  const sales = `${Math.round((data.report.roas * data.report.cost) / 1000_000).toLocaleString('ko-KR')}만원`;
  const cost = `${Math.round(data.report.cost / 10_000).toLocaleString('ko-KR')}만원`;

  return (
    <div className={styles.summary}>
      <h2>{data.title}</h2>
      <dl>
        <div className={styles.category}>
          <dt>상태</dt>
          <dd>{status}</dd>
        </div>
        <div className={styles.category}>
          <dt>광고 생성일</dt>
          <dd>{date}</dd>
        </div>
        <div className={styles.category}>
          <dt>일 희망 예산</dt>
          <dd>{budget}</dd>
        </div>
        <div className={styles.category}>
          <dt>광고 수익률</dt>
          <dd>{roas}</dd>
        </div>
        <div className={styles.category}>
          <dt>매출</dt>
          <dd>{sales}</dd>
        </div>
        <div className={styles.category}>
          <dt>광고 비용</dt>
          <dd>{cost}</dd>
        </div>
      </dl>
      <button type='button'>수정하기</button>
    </div>
  );
};

export default Summary;
