import { useMemo } from 'react';

import { IaddRevenueType } from 'types/adList';
import styles from './mediaTable.module.scss';
import MediaStatusData from '../hooks/MediaStatusData';

const dataStructure = [
  { id: 1, category: '광고비' },
  { id: 2, category: '매출' },
  { id: 3, category: 'ROAS' },
  { id: 4, category: '노출수' },
  { id: 5, category: '클릭수' },
  { id: 6, category: '클릭률(CTR)' },
  { id: 7, category: '클릭당 비용(CPC)' },
];

const MediaTable = () => {
  const { MediaTableData } = MediaStatusData();
  const mediaTableStatus = MediaTableData();

  const tableBody = useMemo(() => {
    return mediaTableStatus?.map((itemList) => {
      const { channel, click, cost, cpc, ctr, imp, roas, revenue } = itemList as IaddRevenueType;

      const convertKor =
        (channel === 'facebook' && '페이스북') ||
        (channel === 'naver' && '네이버') ||
        (channel === 'google' && '구글') ||
        (channel === 'kakao' && '카카오') ||
        (channel === 'total' && '총계');

      return (
        <tr key={`${roas}-${imp}-${cost}`} className={styles.tableRows}>
          <td className={styles.tableData}>{convertKor}</td>
          <td className={styles.tableData}>{cost.toLocaleString()}원</td>
          <td className={styles.tableData}>
            {channel === 'total' ? revenue.toLocaleString() : Math.floor((cost * roas) / 100).toLocaleString()}원
          </td>
          <td className={styles.tableData}>{Math.floor(roas)}%</td>
          <td className={styles.tableData}>{imp.toLocaleString()}</td>
          <td className={styles.tableData}>{click.toLocaleString()}</td>
          <td className={styles.tableData}>{ctr.toFixed(2)}%</td>
          <td className={styles.tableData}>{Math.floor(cpc).toLocaleString()}원</td>
        </tr>
      );
    });
  }, [mediaTableStatus]);

  const tableTitle = useMemo(() => {
    return dataStructure.map(({ category }) => (
      <th key={category} className={styles.tableHead}>
        {category}
      </th>
    ));
  }, []);

  return (
    <div className={styles.boardContainer}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr className={styles.tableRows}>
              <th className={styles.tableHead}>&nbsp;</th>
              {tableTitle}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>{tableBody}</tbody>
        </table>
      </div>
    </div>
  );
};

export default MediaTable;
