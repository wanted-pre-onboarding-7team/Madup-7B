import styles from './adSummary.module.scss';
import { FC } from 'react';

import { IAd } from 'types/adList';
import { getBudgetFormat, getDateFormat, getPriceFormat } from './utils';

interface IProps {
  data: IAd;
}

const AdSummary: FC<IProps> = ({ data }) => {
  const prefix = data.adType === 'web' ? '웹광고_ ' : '앱광고_ ';
  const status = data.status === 'active' ? '진행중' : '종료';
  const roas = `${data.report.roas}%`;
  const date = getDateFormat(data.startDate, data.endDate);
  const budget = getBudgetFormat(data.budget);
  const sales = getPriceFormat(data.report.convValue);
  const cost = getPriceFormat(data.report.cost);

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

export default AdSummary;
