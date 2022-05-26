export const AXIS_STYLE_X = { axis: { stroke: '#94A2AD' }, tickLabels: { fill: '#94A2AD', fontSize: 10 } };

export const AXIS_STYLE_Y_LEFT = {
  axis: { stroke: 'transparent' },
  ticks: { padding: -20 },
  tickLabels: { fill: '#94A2AD', textAnchor: 'start', fontSize: 10 },
  grid: {
    fill: '#94a2ad',
    stroke: '#94a2ad',
    pointerEvents: 'painted',
    strokeWidth: 0.2,
  },
};

export const AXIS_STYLE_Y_RIGHT = {
  axis: { stroke: 'transparent' },
  ticks: { padding: 10 },
  tickLabels: { fill: '#94A2AD', textAnchor: 'end', fontSize: 10 },
  grid: {
    fill: '#94a2ad',
    stroke: '#94a2ad',
    pointerEvents: 'painted',
    strokeWidth: 0.2,
  },
};

export const LINE_STYLE_FIRST = { data: { stroke: '#4fadf7', strokeWidth: 2 } };

export const LINE_STYLE_SECOND = { data: { stroke: '#85da47', strokeWidth: 2 } };

export const TOOLTIP_STYLE = { fill: '#ffffff', stroke: 'none', fontSize: 15, textAnchor: 'middle' };

export const TOOLTIP_FLYOUT_STYLE = { stroke: '#ffffff', fill: '#3a474e', strokeWidth: 0, margin: 10 };
