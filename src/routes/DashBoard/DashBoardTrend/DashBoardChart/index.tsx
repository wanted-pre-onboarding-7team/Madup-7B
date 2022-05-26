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

import { useGraphData } from './useGraphData';
import { numFormatter } from 'utils/utils';
import { IDataset } from './types';

const DashBoardChart = () => {
  const graphCoordData: IDataset[] = useGraphData();

  const getMinMaxLevel = (value: number, type: 'max' | 'min') => {
    const len = Math.floor(value).toString().length;
    const unit = 10 ** len;
    const level = type === 'max' ? Math.ceil(value / unit) * unit : Math.floor(value / unit) / unit;
    return level;
  };

  const xOffset = [40, 932];
  const tickPadding = [-20, 10];
  const anchors = ['start', 'end'];
  const colors = ['#4fadf7', '#85da47'];

  const maxima = graphCoordData.map((dataset) => getMinMaxLevel(Math.max(...dataset.map((data) => data.y)), 'max'));
  const minima = graphCoordData.map((dataset) => getMinMaxLevel(Math.max(...dataset.map((data) => data.y)), 'min'));
  const diff = maxima.map((max, i) => max - minima[i]);

  return (
    <div>
      <VictoryChart width={960} height={360} domainPadding={40} singleQuadrantDomainPadding={{ x: false }}>
        <VictoryAxis
          tickCount={5}
          tickFormat={(x) => dayjs(x).format('MM월 DD일')}
          style={{ axis: { stroke: '#94A2AD' }, tickLabels: { fill: '#94A2AD', fontSize: 10 } }}
        />
        {graphCoordData.map((data, idx) => (
          <VictoryAxis
            dependentAxis
            key={`${data}}`}
            offsetX={xOffset[idx]}
            tickLabelComponent={<VictoryLabel dy={15} />}
            style={{
              axis: { stroke: 'transparent' },
              ticks: { padding: tickPadding[idx] },
              tickLabels: { fill: '#94A2AD', textAnchor: anchors[idx], fontSize: 10 },
              grid: {
                fill: '#94a2ad',
                stroke: '#94a2ad',
                pointerEvents: 'painted',
                strokeWidth: 0.2,
              },
            }}
            tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
            tickFormat={(value) => numFormatter(diff[idx] * value + minima[idx])}
          />
        ))}
        {graphCoordData.map((data, idx) => (
          <VictoryGroup key={`${data}`}>
            <VictoryLine
              data={data}
              y={(datum) => datum.y / maxima[idx]}
              animate={{
                duration: 1000,
                easing: 'bounce',
              }}
              style={{ data: { stroke: colors[idx], strokeWidth: 2 } }}
            />
            <VictoryScatter
              data={data}
              y={(datum) => datum.y / maxima[idx]}
              animate={{
                duration: 1000,
                easing: 'bounce',
              }}
              style={data.length === 1 ? { data: { fill: colors[idx] } } : { data: { fill: 'transparent' } }}
              size={5}
              labels={({ datum }) => `${datum.y}`}
              labelComponent={
                <VictoryTooltip
                  style={{ fill: '#ffffff', stroke: 'none', fontSize: 15, textAnchor: 'middle' }}
                  flyoutStyle={{ stroke: '#ffffff', fill: '#3a474e', strokeWidth: 0, margin: 10 }}
                  flyoutWidth={100}
                  dx={50}
                  dy={50}
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
                              style: { fill: colors[idx], stroke: '#ffffff', strokeWidth: 3 },
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
