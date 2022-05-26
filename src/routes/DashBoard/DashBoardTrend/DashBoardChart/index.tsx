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
import { victoryEvent } from './victoryEvent';
import {
  AXIS_STYLE_X,
  AXIS_STYLE_Y_LEFT,
  AXIS_STYLE_Y_RIGHT,
  LINE_STYLE_FIRST,
  LINE_STYLE_SECOND,
  TOOLTIP_STYLE,
  TOOLTIP_FLYOUT_STYLE,
} from './chartStyles';

const DashBoardChart = () => {
  const graphCoordData: IDataset[] = useGraphData();

  const getMinMaxLevel = (value: number, type: 'max' | 'min') => {
    const len = Math.floor(value).toString().length;
    const unit = 10 ** len;
    const level = type === 'max' ? Math.ceil(value / unit) * unit : Math.floor(value / unit) / unit;
    return level;
  };

  const xOffset = [40, 932];
  const colors = ['#4fadf7', '#85da47'];

  const yAxisStyle = [AXIS_STYLE_Y_LEFT, AXIS_STYLE_Y_RIGHT];

  const lineChartStyle = [LINE_STYLE_FIRST, LINE_STYLE_SECOND];

  const options = {
    width: 960,
    height: 360,
  };

  const maxima = graphCoordData.map((dataset) => getMinMaxLevel(Math.max(...dataset.map((data) => data.y)), 'max'));
  const minima = graphCoordData.map((dataset) => getMinMaxLevel(Math.max(...dataset.map((data) => data.y)), 'min'));
  const diff = maxima.map((max, i) => max - minima[i]);

  return (
    <div>
      <VictoryChart {...options} domainPadding={40} singleQuadrantDomainPadding={{ x: false }}>
        <VictoryAxis tickCount={5} tickFormat={(x) => dayjs(x).format('MM월 DD일')} style={AXIS_STYLE_X} />
        {graphCoordData.map((data, idx) => (
          <VictoryAxis
            dependentAxis
            key={`${data}}`}
            offsetX={xOffset[idx]}
            tickLabelComponent={<VictoryLabel dy={15} />}
            style={yAxisStyle[idx]}
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
              style={lineChartStyle[idx]}
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
                  style={TOOLTIP_STYLE}
                  flyoutStyle={TOOLTIP_FLYOUT_STYLE}
                  flyoutWidth={100}
                  dx={50}
                  dy={50}
                />
              }
              events={[{ target: 'data', eventHandlers: { ...victoryEvent[idx] } }]}
            />
          </VictoryGroup>
        ))}
      </VictoryChart>
    </div>
  );
};

export default DashBoardChart;
