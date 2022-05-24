import styles from './calendar.module.scss';
import { useRecoilState } from 'recoil';
import { useCallback, useState } from 'react';
import { DateRangePicker, defaultStaticRanges, RangeKeyDict } from 'react-date-range';
import ko from 'date-fns/locale/ko';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { endDateState, startDateState } from 'states/atom';

const newRangesLabels = ['오늘', '어제', '이번 주', '지난 주', '이번 달', '지난 달'];

interface IProps {
  setIsOpenModal: Function;
}

const CalendarModal = ({ setIsOpenModal }: IProps) => {
  const [startDateRecoil, setStartDateRecoil] = useRecoilState(startDateState);
  const [endDateRecoil, setEndDateRecoil] = useRecoilState(endDateState);

  const [curRange, setCurRange] = useState([
    {
      startDate: startDateRecoil,
      endDate: endDateRecoil,
      key: 'selection',
    },
  ]);

  const onChange = useCallback(({ selection }: RangeKeyDict) => {
    const { startDate, endDate } = selection;

    setCurRange([{ startDate, endDate, key: 'selection' }]);
  }, []);

  const onClickCloseBtn = () => {
    setIsOpenModal(false);
  };

  const onClickApplyBtn = () => {
    const { startDate, endDate } = curRange[0];

    setStartDateRecoil(startDate);
    setEndDateRecoil(endDate);

    setIsOpenModal(false);
  };

  const staticRangesKO = defaultStaticRanges.map((item, index) => ({ ...item, label: newRangesLabels[index] }));

  const options = {
    showDateDisplay: false,
    showMonthAndYearPickers: false,
    editableDateInputs: false,
    locale: ko,
    onChange,
    ranges: curRange,
    moveRangeOnFirstSelection: false,
    months: 2,
    inputRanges: [],
    staticRanges: staticRangesKO,
    monthDisplayFormat: 'yyy년 MM월',
  };

  return (
    <div className={styles.modalWrap}>
      <DateRangePicker direction='horizontal' {...options} />
      <div className={styles.btnWrap}>
        <button type='button' className={styles.closeBtn} onClick={onClickCloseBtn} aria-label='close button'>
          닫기
        </button>
        <button type='button' className={styles.applyBtn} onClick={onClickApplyBtn} aria-label='apply button'>
          적용
        </button>
      </div>
    </div>
  );
};

export default CalendarModal;
