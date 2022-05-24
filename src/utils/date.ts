import dayjs from 'dayjs';

export const dateToYMD = (date: Date | undefined) => {
  if (!date) return null;
  return dayjs(date).format('YYYY년 MM월 DD일');
};
