import { inclusionDateState } from '../../../../states/atom';
import { useRecoilValue } from 'recoil';
import { IfilterList } from 'types/adList';
import { cloneDeep } from 'lodash';

const MediaStatusData = () => {
  const inclusionDate = useRecoilValue(inclusionDateState);

  const MediaTableData = () => {
    const sum: IfilterList[] = Object.values(
      inclusionDate.reduce((acc: any, item) => {
        const { channel, click, convValue, cost, cpa, cpc, ctr, cvr, imp, roas } = item;
        acc[channel] = acc[channel]
          ? {
              ...item,
              click: click + acc[channel].click,
              convValue: convValue + acc[channel].convValue,
              cost: cost + acc[channel].cost,
              cpa: cpa + acc[channel].cpa,
              cpc: cpc + acc[channel].cpc,
              ctr: ctr + acc[channel].ctr,
              cvr: cvr + acc[channel].cvr,
              imp: imp + acc[channel].imp,
              roas: roas + acc[channel].roas,
            }
          : item;
        return acc;
      }, [])
    );

    if (!sum) return null;

    const total: IfilterList = {
      channel: 'total',
      click: 0,
      convValue: 0,
      cost: 0,
      cpa: 0,
      cpc: 0,
      ctr: 0,
      cvr: 0,
      imp: 0,
      roas: 0,
    };

    sum.forEach((itemList) => {
      const { click, convValue, cost, cpa, cpc, ctr, cvr, imp, roas } = itemList as IfilterList;
      if (!total.channel) total.channel = 'total';

      total.click += click;
      total.convValue += convValue;
      total.cost += cost;
      total.cpa += cpa;
      total.cpc += cpc;
      total.ctr += ctr;
      total.cvr += cvr;
      total.imp += imp;
      total.roas += roas;
    });

    console.log('sum :', sum);
    console.log('total :', total);

    return [...sum, total];
  };

  const MediaChartData = () => {
    const dataStructure = [
      { value: 0, category: '광고비', percent: 25 },
      { value: 0, category: '매출', percent: 25 },
      { value: 0, category: '노출 수', percent: 25 },
      { value: 0, category: '클릭 수', percent: 25 },
      { value: 0, category: '전환 수', percent: 25 },
    ];

    const totalGoogle = cloneDeep(dataStructure);
    const totalFacebook = cloneDeep(dataStructure);
    const totalNaver = cloneDeep(dataStructure);
    const totalKakao = cloneDeep(dataStructure);

    const getChartData = () => {
      const data: Record<string, { value: number; category: string }[]> = {
        google: [...totalGoogle],
        facebook: [...totalFacebook],
        naver: [...totalNaver],
        kakao: [...totalKakao],
      };

      inclusionDate.forEach(({ channel, cost, imp, click, cvr }) => {
        data[channel].find(({ category }) => category === '광고비')!.value += cost;
        data[channel].find(({ category }) => category === '노출 수')!.value += imp;
        data[channel].find(({ category }) => category === '클릭 수')!.value += click;
        data[channel].find(({ category }) => category === '전환 수')!.value += cvr;
      });

      const mediaTable = MediaTableData();

      mediaTable?.forEach(({ channel, cost, roas }) => {
        if (channel === 'total') return;

        const cvrUnitConversion = Math.floor(data[channel].find(({ category }) => category === '전환 수')!.value);

        data[channel].find(({ category }) => category === '전환 수')!.value = cvrUnitConversion;
        data[channel].find(({ category }) => category === '매출')!.value = Math.floor((cost * roas) / 100);
      });

      mediaTable?.forEach(({ channel, click, convValue, cost, cpa, cpc, ctr, cvr, date, imp, roas }) => {
        if (channel === 'total') return;

        const cvrUnitConversion = Math.floor(data[channel].find(({ category }) => category === '전환 수')!.value);

        data[channel].find(({ category }) => category === '전환 수')!.value = cvrUnitConversion;
        data[channel].find(({ category }) => category === '매출')!.value = Math.floor((cost * roas) / 100);
      });

      // console.log('mediaTable :', mediaTable);

      return data;
    };

    return getChartData();
  };

  return { MediaTableData, MediaChartData };
};

export default MediaStatusData;
