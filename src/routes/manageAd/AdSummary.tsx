import { FC } from 'react';
import styles from './adSummary.module.scss';

import { IAd } from 'types/adList';

interface IProps {
  data: IAd;
}

const AdSummary: FC<IProps> = ({ data }) => {
  const prefix = data.adType === 'web' ? '웹광고_ ' : '앱광고_ ';
  const status = data.status === 'active' ? '진행중' : '종료';
  const date = () => {
    if (data.endDate === null) {
      const onGoing = data.startDate.slice(0, 10);
      return onGoing;
    }

    const done = `${data.startDate.slice(0, 10)}
    (${data.endDate.slice(0, 10)})`;
    return done;
  };

  const budget = (cost: number) => {
    const number = cost / 10000;
    if (number >= 100) {
      return `${Number(data.budget / 10_000)}만원`;
    }
    if (number >= 10 && String(number).length === 2) return `${number}만원`;

    if (number >= 10 && String(number).length > 2) {
      const numToString = String(number);
      const result = [numToString.slice(0, 2), '만', ' ', numToString.slice(-1), '천원'].join('');
      return result;
    }
    return `${Number(data.budget / 10_00)}천원`;
  };
  const roas = `${data.report.roas}%`;
  const sales = `${Math.round((data.report.roas * data.report.cost) / 1000_000).toLocaleString('ko-KR')}만원`;
  const cost = `${Math.round(data.report.cost / 10_000).toLocaleString('ko-KR')}만원`;

  return (
    <div className={styles.summary}>
      <h2>{prefix + data.title}</h2>
      <dl>
        <div className={styles.category}>
          <dt>상태</dt>
          <dd>{status}</dd>
        </div>
        <div className={styles.category}>
          <dt>광고 생성일</dt>
          <dd>{date()}</dd>
        </div>
        <div className={styles.category}>
          <dt>일 희망 예산</dt>
          <dd>{budget(data.budget)}</dd>
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

export default AdSummary;
