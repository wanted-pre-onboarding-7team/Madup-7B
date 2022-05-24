import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryBar,
} from 'victory';
import { Dropdown } from 'components/Dropdown';
import { GreenCircle, BlueCircle } from 'assets/svg/index';
import TREND_DATA from '../../../data/trend.json';

// ROAS, 광고비, 노출수, 클릭수, 전환수, 매출
// 광고비 = cost
// 매출액 = roas * cost /  100
// ROAS = roas
// 노출 수 = imp
// 클릭 수 = click
// 클릭률(CTR) = ctr
// 클릭당 비용(CPC) = cpa
const data = [
  { quarter: 1, earnings: 13000, earnings2: 6500 },
  { quarter: 2, earnings: 16500, earnings2: 8250 },
  { quarter: 3, earnings: 14250, earnings2: 7125 },
  { quarter: 4, earnings: 19000, earnings2: 9500 },
];

const data2 = [
  { imp: 5147, click: 559, date: '2202-02-01' },
  { imp: 5338, click: 690, date: '2202-02-02' },
  { imp: 7140, click: 693, date: '2202-02-03' },
];

const DashBoardChart = () => {
  const impData = data2.map((item) => item.imp);
  const clickData = data2.map((item) => item.click);
  const dateData = data2.map((item) => item.date);

  console.log('1', impData, '2', clickData, '3', dateData);

  return (
    <div>
      <Dropdown list={['혜린', '토실']} svgIcon={<GreenCircle />} />
      <Dropdown list={['토토토실', '토시리']} svgIcon={<BlueCircle />} />
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
