import { useRecoilValue } from 'recoil';
import {
  VictoryLine,
  VictoryAxis,
  VictoryChart,
  VictoryScatter,
  VictoryGroup,
  VictoryTooltip,
  VictoryLabel,
} from 'victory';
import dayjs from 'dayjs';

import trendData from 'data/trend.json';
import { graphCategoryAtom } from 'states/graph';

interface IDatum {
  x: string;
  y: number;
}

type IDataset = IDatum[];

const DashBoardChart = () => {
  const graphCategories = useRecoilValue(graphCategoryAtom);

  const startDate = Number(dayjs('2022-02-01').format('MMDD'));
  const endData = Number(dayjs('2022-02-07').format('MMDD'));

  const dailyTrendData = trendData.report.daily;

  const FilteredDataByDate = dailyTrendData.filter((data) => {
    const convertedDate = Number(dayjs(data.date).format('MMDD'));

    return startDate <= convertedDate && convertedDate <= endData;
  });

  const firstGraphCoords: IDataset = FilteredDataByDate.map((data) => {
    return { x: data.date, y: data[graphCategories[0]] };
  });

  const secondGraphCoords = FilteredDataByDate.map((data) => {
    return { x: data.date, y: data[graphCategories[1]] };
  });

  const graphCoordData: IDataset[] = [firstGraphCoords, secondGraphCoords];

  const getMinMaxLevel = (value: number, type: 'max' | 'min') => {
    const len = Math.floor(value).toString().length;
    const unit = 10 ** len;
    const level = type === 'max' ? Math.ceil(value / unit) * unit : Math.floor(value / unit) / unit;
    return level;
  };

  const maxima = graphCoordData.map((dataset) => getMinMaxLevel(Math.max(...dataset.map((data) => data.y)), 'max'));

  const minima = graphCoordData.map((dataset) => getMinMaxLevel(Math.max(...dataset.map((data) => data.y)), 'min'));

  const diff = maxima.map((max, i) => max - minima[i]);

  return (
    <div>
      <VictoryChart width={960} height={360} domainPadding={{ x: 100, y: [20, 20] }}>
        <VictoryAxis
          tickValues={graphCoordData[0].map((data) => data.x)}
          tickFormat={(x) => dayjs(x).format('MM월 DD일')}
          style={{ axis: { stroke: '#94A2AD' }, tickLabels: { fill: '#94A2AD' } }}
        />
        {graphCoordData.map((data, idx) => (
          <VictoryAxis
            dependentAxis
            key={idx}
            offsetX={[50, 910][idx]}
            tickLabelComponent={<VictoryLabel dy={15} />}
            style={{
              axis: { stroke: 'transparent' },
              ticks: { padding: [-20, 10][idx] },
              tickLabels: { fill: '#94A2AD', textAnchor: ['start', 'end'][idx] },
              grid: {
                fill: '#94a2ad',
                stroke: '#94a2ad',
                pointerEvents: 'painted',
                strokeWidth: 0.2,
              },
            }}
            tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
            tickFormat={(value) => diff[idx] * value + minima[idx]}
          />
        ))}
        {graphCoordData.map((data, idx) => (
          <VictoryGroup key={idx}>
            <VictoryLine
              data={data}
              y={(datum) => datum.y / maxima[idx]}
              style={{ data: { stroke: ['#4fadf7', '#85da47'][idx], strokeWidth: 2 } }}
            />
            <VictoryScatter
              data={data}
              y={(datum) => datum.y / maxima[idx]}
              animate={{
                duration: 2000,
                easing: 'bounce',
              }}
              style={{ data: { fill: 'transparent' } }}
              size={5}
              labels={({ datum }) => `${datum.y}`}
              labelComponent={
                <VictoryTooltip
                  style={{ fill: 'white', fontSize: 20, textAnchor: 'middle' }}
                  flyoutStyle={{
                    stroke: '#3a474e',
                    fill: '#3a474e',
                    margin: 10,
                  }}
                  flyoutWidth={100}
                  dx={60}
                  dy={60}
                />
              }
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => {
                            return {
                              size: 5,
                              style: { fill: ['#4fadf7', '#85da47'][idx], stroke: '#ffffff', strokeWidth: 3 },
                            };
                          },
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: true }),
                        },
                      ];
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => {},
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: false }),
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </VictoryGroup>
        ))}
      </VictoryChart>
    </div>
  );
};

export default DashBoardChart;
