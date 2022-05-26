import { useMemo } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryStack, VictoryTheme, VictoryTooltip } from 'victory';
import {
  CHART_STYLE,
  TICK_STYLE_X,
  TICK_STYLE_Y,
  TOOLTIP_FONT_STYLE,
  TOOLTIP_FLYOUT_STYLE,
  COLOR_SCALE,
} from './chartStyle';

import styles from './mediaChart.module.scss';
import MediaStatusData from '../hooks/MediaStatusData';

const tickFormat = ['광고비', '매출', '노출 수', '클릭 수', '전환 수'];

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

const MediaChart = () => {
  const { MediaChartData } = MediaStatusData();
  const { google, facebook, naver, kakao } = MediaChartData();
  const tooltip = CustomTooltip();

  const dataList = useMemo(() => {
    return [
      { id: 1, data: google },
      { id: 2, data: naver },
      { id: 3, data: facebook },
      { id: 4, data: kakao },
    ];
  }, [google, facebook, naver, kakao]);

  const victoryBarList = useMemo(() => {
    return dataList?.map(({ id, data }) => {
      return (
        <VictoryBar
          key={`${id}-${data}`}
          data={data}
          {...CHART_STYLE.bar}
          labels={({ datum }) => datum.value}
          labelComponent={tooltip}
          cornerRadius={{ top: data === kakao ? 6 : 0 }}
        />
      );
    });
  }, [dataList, tooltip, kakao]);

  return (
    <div className={styles.mediaChartWrap}>
      <div className={styles.mediaChart}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={75}
          width={960}
          height={300}
          minDomain={{ y: 0 }}
          maxDomain={{ y: 100 }}
        >
          <VictoryAxis tickFormat={tickFormat} style={TICK_STYLE_Y} />
          <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}%`} style={TICK_STYLE_X} />
          <VictoryStack colorScale={COLOR_SCALE}>{victoryBarList}</VictoryStack>
        </VictoryChart>
      </div>
    </div>
  );
};

export default MediaChart;
