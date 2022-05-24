import { useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { startDateState, endDateState, inclusionDateState } from '../../../states/Date';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import CHANNEL_DATA from '../../../data/mediaChannel.json';
import styles from './mediaTable.module.scss';

const dataStructure = [
  { value: 0, category: '광고비' }, // cost
  { value: 0, category: '매출' }, // cost * roas / 100
  { value: 0, category: 'ROAS' }, // roas
  { value: 0, category: '노출수' }, // imp
  { value: 0, category: '클릭수' }, // click
  { value: 0, category: '클릭률(CTR)' }, // ctr
  { value: 0, category: '클릭당비용(CPC)' }, // cpc
];

const MediaTable = () => {
  const setStartDate = useSetRecoilState(startDateState); // 삭제
  const setEndDate = useSetRecoilState(endDateState); // 삭제
  const inclusionDate = useRecoilValue(inclusionDateState);

  useEffect(() => {
    setStartDate(dayjs(CHANNEL_DATA[0].date).format('YYYY-MM-DD')); // 삭제
    setEndDate(dayjs(CHANNEL_DATA[3].date).format('YYYY-MM-DD')); // 삭제
  }, [setStartDate, setEndDate]);

  //   const sumValue = useMemo(() => {
  //     const data: Record<string, { value: number; category: string }[]> = {
  //       google: [...dataStructure],
  //       facebook: [...dataStructure],
  //       naver: [...dataStructure],
  //       kakao: [...dataStructure],
  //     };

  //     inclusionDate?.forEach(({ channel, cost, roas, imp, click, ctr, cpc }) => {
  //       data[channel].find((item) => item.category === '광고비')!.value += cost;
  //       data[channel].find((item) => item.category === '매출')!.value += cost * roas;
  //       data[channel].find((item) => item.category === 'ROAS')!.value += roas;
  //       data[channel].find((item) => item.category === '노출수')!.value += imp;
  //       data[channel].find((item) => item.category === '클릭수')!.value += click;
  //       data[channel].find((item) => item.category === '클릭률(CTR)')!.value += ctr;
  //       data[channel].find((item) => item.category === '클릭당비용(CPC)')!.value += cpc;
  //     });

  //     return data;
  //   }, [inclusionDate]);

  // const a = () => {
  //   return <div>하이</div>;
  //   console.log(sumValue.google);
  // };

  // console.log(a());

  // const ABC = useMemo(() => {
  //   // console.log('sumData +', sumData); // {google: Array(7), facebook: Array(7), naver: Array(7), kakao: Array(7)}
  //   // console.log('inclusionDate +', inclusionDate); // [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

  //   // if (!inclusionDate) return;

  //   console.log('data.google', data.google[1].value);
  //   console.log(data);

  //   return data?.google.map((el) => {
  //     return (
  //       <tr key={el.category}>
  //         <td>{el.value}</td>
  //       </tr>
  //     );
  //   });
  // }, [inclusionDate]);

  const absfd = () => {
    const facebookList = inclusionDate.filter((el) => el.channel === 'facebook');
    const naverList = inclusionDate.filter((el) => el.channel === 'naver');
    const googleList = inclusionDate.filter((el) => el.channel === 'google');
    const kakaoList = inclusionDate.filter((el) => el.channel === 'kakao');
  };

  console.log(absfd());

  // function fncArrMerge2() {
  //   const arr = [
  //     { index: 1, text: 1 },
  //     { index: 1, text: 2 },
  //     { index: 1, text: 3 },
  //     { index: 2, text: 1 },
  //     { index: 2, text: 3 },
  //     { index: 2, text: 5 },
  //     { index: 3, text: 10 },
  //   ];

  //   const resultArr: any = [];
  //   let flag = false;
  //   let cnt = 0;
  //   for (let i = 0; i < arr.length; i += 1) {
  //     cnt = 0;
  //     flag = false;
  //     for (const value in resultArr) {
  //       if (resultArr.hasOwnProperty(value)) {
  //         console.log(value);
  //       }

  //       if (resultArr[value].index === arr[i].index) {
  //         flag = true;
  //       }
  //       if (flag) {
  //         ++cnt;
  //         resultArr[value].index = Number(arr[i].index);
  //         resultArr[value].text += Number(arr[i].text);
  //       }
  //     }
  //     if (cnt == 0) {
  //       resultArr.push(arr[i]);
  //     }
  //   }

  //   console.log(resultArr);
  // }

  const tableBody = useMemo(() => {
    return inclusionDate.map(({ channel, roas, imp, cost, click, ctr, cpc }) => {
      // const convertKor =
      //   (channel === 'facebook' && '구글') ||
      //   (channel === 'naver' && '네이버') ||
      //   (channel === 'google' && '구글') ||
      //   (channel === 'kakao' && '카카오');

      return (
        <tr key={`${roas}-${imp}-${cost}`} className={styles.tableRows}>
          <td className={styles.tableData}>{channel}</td>
          <td className={styles.tableData}>{cost}원</td>
          <td className={styles.tableData}>{Math.ceil((cost * roas) / 100)}원</td>
          <td className={styles.tableData}>{Math.ceil(roas)}%</td>
          <td className={styles.tableData}>{imp}</td>
          <td className={styles.tableData}>{click}</td>
          <td className={styles.tableData}>{ctr}%</td>
          <td className={styles.tableData}>{cpc}원</td>
        </tr>
      );
    });
  }, [inclusionDate]);

  const tableTitle = useMemo(() => {
    return dataStructure.map(({ category }) => (
      <th key={category} className={styles.tableHead}>
        {category}
      </th>
    ));
  }, []);

  return (
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
  );
};

export default MediaTable;
