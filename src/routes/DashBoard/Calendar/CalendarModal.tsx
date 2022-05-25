import styles from './calendar.module.scss';
import { useRecoilState } from 'recoil';
import { useCallback, useState } from 'react';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import ko from 'date-fns/locale/ko';

import { endDateState, startDateState } from 'states/atom';
import './calendarModal.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

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

  const options = {
    onChange,
    showDateDisplay: false,
    showMonthAndYearPickers: false,
    editableDateInputs: false,
    moveRangeOnFirstSelection: false,
    minDate: new Date('2022, 02, 01'),
    maxDate: new Date('2022, 04, 20'),
    monthDisplayFormat: 'yyy년 MM월',
    inputRanges: [],
    ranges: curRange,
    locale: ko,
    months: 2,
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
