import dayjs from 'dayjs';

export const dateToYMD = (date: Date | undefined) => {
  if (!date) return null;
  return dayjs(date).format('YYYY년 MM월 DD일');
};

export const numFormatter = (num: number): number | string => {
  if (num >= 10000 && num < 1000000) {
    return `${(num / 10000).toLocaleString(undefined, { maximumFractionDigits: 1 })}만`;
  }
  if (num >= 1000000 && num < 10000000) {
    return `${(num / 1000000).toLocaleString(undefined, { maximumFractionDigits: 1 })}백만`;
  }
  if (num >= 10000000 && num < 100000000) {
    return `${(num / 10000000).toLocaleString(undefined, { maximumFractionDigits: 1 })}천만`;
  }
  if (num >= 100000000) {
    return `${(num / 100000000).toLocaleString(undefined, { maximumFractionDigits: 1 })}억`;
  }
  return num.toLocaleString();
};
