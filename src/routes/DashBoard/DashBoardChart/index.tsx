import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';
import { Dropdown } from 'components/Dropdown';
import { GreenCircle, BlueCircle, WhiteCircle } from 'assets/svg/index';
import styles from './dashBoardChart.module.scss';

// ROAS, 광고비, 노출수, 클릭수, 전환수, 매출
// 광고비 = cost
// 매출액 = roas * cost /  100
// ROAS = roas
// 노출 수 = imp
// 클릭 수 = click
// 클릭률(CTR) = ctr
// 클릭당 비용(CPC) = cpa

const sortList = ['ROAS', '광고비', '노출수', '클릭수', '전환수', '매출'];
const dateList = ['주간', '일별'];

const data2 = [
  { imp: 5147, click: 559, date: '2202-02-01' },
  { imp: 5338, click: 690, date: '2202-02-02' },
  { imp: 7140, click: 693, date: '2202-02-03' },
];

const DashBoardChart = () => {

  return (
    <div>
      <section className={styles.buttonContainer}>
        <div className={styles.dropdown}>
          <Dropdown list={sortList} svgIcon={<BlueCircle />} />
          <Dropdown list={sortList} svgIcon={<GreenCircle />} />
        </div>
        <Dropdown list={dateList} svgIcon={<WhiteCircle />} />
      </section>

      <VictoryChart domainPadding={20} width={960} height={240}>
        <VictoryAxis dependentAxis tickValues={[0.25, 0.5, 0.75, 1]} tickFormat={(t) => `${t * 10}imp`} />
        <VictoryAxis
          dependentAxis
          offsetX={970}
          tickValues={[0.25, 0.5, 0.75, 1]}
          tickFormat={(t) => `${t * 10}click`}
        />
        <VictoryLine data={data2} x='date' y='imp' style={{ data: { strokeWidth: 1, stroke: '#4FADF7' } }} />
        <VictoryLine data={data2} x='date' y='click' style={{ data: { strokeWidth: 1, stroke: '#85DA47' } }} />
      </VictoryChart>
    </div>
  );
};

export default DashBoardChart;
