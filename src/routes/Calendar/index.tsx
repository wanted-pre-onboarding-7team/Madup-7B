import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { startDateState, endDateState } from 'states/atom';
import styles from './calendar.module.scss';
import CalendarModal from './CalendarModal';
import { ArrowDownIcon } from 'assets/svg';
import { dateToYMD } from 'utils/date';

const Calendar = () => {
  const [startDate] = useRecoilState(startDateState);
  const [endDate] = useRecoilState(endDateState);
  const [isModalOpen, setIsOpenModal] = useState(false);

  const displayDateRange = `${dateToYMD(startDate)} ~ ${dateToYMD(endDate)}`;

  const onClick = () => {
    setIsOpenModal(true);
  };

  return (
    <div className={styles.calendar}>
      <button type='button' className={styles.display} onClick={onClick}>
        {displayDateRange}
        <ArrowDownIcon />
      </button>
      {isModalOpen && <CalendarModal setIsOpenModal={setIsOpenModal} />}
    </div>
  );
};

export default Calendar;
