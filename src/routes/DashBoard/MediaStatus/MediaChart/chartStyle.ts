export const CHART_STYLE = {
  bar: {
    style: {
      data: { stroke: '#FFFFFF', strokeWidth: 1 },
    },
    barWidth: 30,
    x: 'category',
    y: 'percent',
    label: 'value',
  },
};

export const TICK_STYLE_Y = {
  axis: { stroke: '#eceff1', strokeWidth: 1 },
  tickLabels: { fontSize: 12, padding: 15, fontFamily: 'Roboto', fill: '#94a2ad' },
  ticks: { stroke: 'none' },
  grid: { stroke: 'none' },
};

export const TICK_STYLE_X = {
  axis: { stroke: 'none' },
  grid: { strokeDasharray: 'none' },
  ticks: { stroke: 'none' },
};

export const TOOLTIP_FLYOUT_STYLE = {
  stroke: '#ffffff',
  fill: '#3a474e',
  strokeWidth: 0,
};

export const TOOLTIP_FONT_STYLE = { fill: '#ffffff', stroke: 'none', fontSize: 15 };

export const COLOR_SCALE = ['#ac8af8', '#85da47', '#4fadf7', '#f7d849'];
