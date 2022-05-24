import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryBar,
} from 'victory';

import TREND_DATA from '../../../data/trend.json';

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
  const firstData = data2.map((item) => item.imp);
  const secondData = data2.map((item) => item.click);
  const dateData = data2.map((item) => item.date);

  console.log('1', firstData, '2', secondData, '3', dateData);

  // console.log(TREND_DATA.report.daily);
  // TREND_DATA.report.daily.forEach((d) => {
  //   console.log(d);
  // });

  return (
    <div>
      <VictoryChart domainPadding={20}>
        <VictoryAxis dependentAxis tickValues={[0.25, 0.5, 0.75, 1]} tickFormat={(t) => `${t * 10}imp`} />
        <VictoryAxis
          dependentAxis
          offsetX={970}
          tickValues={[0.25, 0.5, 0.75, 1]}
          tickFormat={(t) => `${t * 10}click`}
        />
        <VictoryLine data={data2} x='date' y='imp' />
        <VictoryLine data={data2} x='date' y='click' />
      </VictoryChart>
    </div>
  );
};

export default DashBoardChart;
