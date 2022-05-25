import { useRecoilState, useRecoilValue } from 'recoil';
import {
  VictoryLine,
  VictoryAxis,
  VictoryChart,
  VictoryScatter,
  VictoryGroup,
  VictoryTooltip,
  VictoryLabel,
  VictoryCursorContainer,
} from 'victory';
import dayjs from 'dayjs';

import trendData from 'data/trend.json';
import { firstGraphCategoryAtom, secondGraphCategoryAtom, termCategoryAtom } from 'states/graph';
import useData from 'hooks/useData';
import { useGraphData } from './utils';

interface IDatum {
  x: string;
  y: number;
}

type IDataset = IDatum[];

const DashBoardChart = () => {
  const { getCurTrendData } = useData();

  const FilteredDataByDate = getCurTrendData();

  const [secondGraphCategory, setSecondGraphCategory] = useRecoilState(secondGraphCategoryAtom);
  const [firstGraphCategory, setFirstGraphCategory] = useRecoilState(firstGraphCategoryAtom);

  const firstGraphCoords: IDataset = FilteredDataByDate.map((data) => {
    return { x: data.date, y: data[firstGraphCategory] };
  });

  const secondGraphCoords = FilteredDataByDate.map((data) => {
    return { x: data.date, y: data[secondGraphCategory] };
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

  const term = useRecoilValue(termCategoryAtom);

  const testValue = term === '일별' ? 8 : 2;

  console.log('@@@@@', useGraphData());

  return (
    <div>
      <VictoryChart width={960} height={330} domainPadding={40} singleQuadrantDomainPadding={{ x: false }}>
        <VictoryAxis
          tickCount={testValue}
          tickFormat={(x) => dayjs(x).format('MM월 DD일')}
          style={{ axis: { stroke: '#94A2AD' }, tickLabels: { fill: '#94A2AD', fontSize: 10 } }}
        />
        {graphCoordData.map((data, idx) => (
          <VictoryAxis
            dependentAxis
            key={idx}
            offsetX={[40, 932][idx]}
            tickLabelComponent={<VictoryLabel dy={15} />}
            style={{
              axis: { stroke: 'transparent' },
              ticks: { padding: [-20, 10][idx] },
              tickLabels: { fill: '#94A2AD', textAnchor: ['start', 'end'][idx], fontSize: 10 },
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
              // 따로 빼기
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