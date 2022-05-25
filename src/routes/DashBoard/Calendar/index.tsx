import styles from './calendar.module.scss';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { dateToYMD } from 'utils/date';
import { startDateState, endDateState } from 'states/atom';

import { ArrowDownIcon } from 'assets/svg';
import CalendarModal from './CalendarModal';

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
