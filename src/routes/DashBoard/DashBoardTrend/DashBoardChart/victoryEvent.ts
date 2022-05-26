export const firstVictoryEvent = {
  onMouseOver: () => {
    return [
      {
        target: 'data',
        mutation: () => {
          return {
            size: 5,
            style: { fill: '#4fadf7', stroke: '#ffffff', strokeWidth: 3 },
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
};

const secondVictoryEvent = {
  onMouseOver: () => {
    return [
      {
        target: 'data',
        mutation: () => {
          return {
            size: 5,
            style: { fill: '#85da47', stroke: '#ffffff', strokeWidth: 3 },
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
};

export const victoryEvent = [firstVictoryEvent, secondVictoryEvent];
