import styles from './cardList.module.scss';

import { cx } from 'styles';
import { TriangleIcon } from 'assets/svg';

interface IProps {
  valueName: string;
  sumValue: number;
  diffValue: number;
}

const IndicatorCard = ({ valueName, sumValue, diffValue }: IProps) => {
  const unit = {
    ROAS: '%',
    광고비: '원',
    '노출 수': '회',
    '클릭 수': '회',
    '전환 수': '회',
    매출: '원',
  }[valueName];

  return (
    <li className={styles.indicatorCard}>
      <span className={styles.valueName}>{valueName}</span>
      <div className={styles.valueWrap}>
        <span className={styles.sameValue}>{sumValue.toLocaleString() + unit}</span>
        <div className={styles.suffix}>
          <TriangleIcon className={cx(styles.triangleDown, { [styles.triangleUp]: diffValue >= 0 })} />
          <span className={styles.diffValue}>{diffValue.toLocaleString() + unit}</span>
        </div>
      </div>
    </li>
  );
};

export default IndicatorCard;
