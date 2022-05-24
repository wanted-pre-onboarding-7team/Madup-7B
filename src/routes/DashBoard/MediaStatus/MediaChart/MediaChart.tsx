import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme, VictoryTooltip } from 'victory';

import CHANNEL_DATA from '../../../../data/mediaChannel.json';

import {
  CHART_STYLE,
  TICK_STYLE_X,
  TICK_STYLE_Y,
  TOOLTIP_FONT_STYLE,
  TOOLTIP_FLYOUT_STYLE,
  COLOR_SCALE,
} from './chartStyle';

import styles from './mediaChart.module.scss';

const tickFormat = ['광고비', '매출', '노출 수', '클릭 수', '전환 수'];

const dataStructure = [
  { value: 0, category: '광고비' },
  { value: 0, category: '매출' },
  { value: 0, category: '노출 수' },
  { value: 0, category: '클릭 수' },
  { value: 0, category: '전환 수' },
];

const getFuck = () => {
  const data: Record<string, { value: number; category: string }[]> = {
    google: [...dataStructure],
    facebook: [...dataStructure],
    naver: [...dataStructure],
    kakao: [...dataStructure],
  };

  CHANNEL_DATA.forEach((d) => {
    data[d.channel].find((item) => item.category === '광고비')!.value += d.cost;
    data[d.channel].find((item) => item.category === '매출')!.value += d.roas;
    data[d.channel].find((item) => item.category === '노출 수')!.value += d.imp;
    data[d.channel].find((item) => item.category === '클릭 수')!.value += d.ctr;
    data[d.channel].find((item) => item.category === '전환 수')!.value += d.cvr;
  });

  return data;
};

const { google, facebook, naver, kakao } = getFuck();

const CustomTooltip = () => {
  return (
    <VictoryTooltip
      flyoutHeight={40}
      flyoutWidth={100}
      flyoutPadding={25}
      cornerRadius={5}
      style={TOOLTIP_FONT_STYLE}
      flyoutStyle={TOOLTIP_FLYOUT_STYLE}
    />
  );
};

const tooltip = CustomTooltip();

const MediaChart = () => {
  return (
    <div className={styles.mediaChartWrap}>
      <div className={styles.mediaChart}>
        <VictoryChart theme={VictoryTheme.material} domainPadding={75} width={960} height={300}>
          <VictoryAxis tickValues={tickFormat} tickFormat={tickFormat} style={TICK_STYLE_Y} />
          <VictoryAxis dependentAxis tickFormat={(y) => `${y / 1000000}%`} style={TICK_STYLE_X} />
          <VictoryStack colorScale={COLOR_SCALE}>
            <VictoryBar
              data={google}
              {...CHART_STYLE.bar}
              labels={({ datum }) => datum.value}
              labelComponent={tooltip}
            />
            <VictoryBar
              data={facebook}
              {...CHART_STYLE.bar}
              labels={({ datum }) => datum.value}
              labelComponent={tooltip}
            />
            <VictoryBar
              data={naver}
              {...CHART_STYLE.bar}
              labels={({ datum }) => datum.value}
              labelComponent={tooltip}
            />
            <VictoryBar
              data={kakao}
              {...CHART_STYLE.bar}
              labels={({ datum }) => datum.value}
              labelComponent={tooltip}
              cornerRadius={{ top: 6 }}
            />
          </VictoryStack>
        </VictoryChart>
      </div>
    </div>
  );
};

export default MediaChart;
