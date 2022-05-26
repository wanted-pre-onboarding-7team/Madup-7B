export const getDateFormat = (start: string, end: string | null) => {
  if (end === null) {
    const onGoing = start.slice(0, 10);
    return onGoing;
  }

  const done = `${start.slice(0, 10)}
  (${end.slice(0, 10)})`;
  return done;
};

export const getBudgetFormat = (budget: number) => {
  const tenThousand = Math.floor(budget / 10_000);
  const thousand = Math.floor(budget / 1_000) - tenThousand * 10;

  if (tenThousand < 10 && thousand > 0) return `${tenThousand * 10 + thousand}천원`;
  if (tenThousand < 10) return `${tenThousand * 10}천원`;
  if (thousand) return `${tenThousand}만 ${thousand}천원`;

  return `${tenThousand}만원`;
};

export const getPriceFormat = (value: number) => {
  const cash = Math.floor(value / 10_000).toLocaleString('ko-KR');

  return `${cash}만원`;
};
