import styles from './dataMark.module.scss';

const DataMark = () => {
  return (
    <div className={styles.dataMarkWrap}>
      {dataSet.map(({ title, color }) => (
        <div key={`${title}-${color}`} className={styles.dataMark}>
          <div className={styles.circle} style={{ background: color }} />
          <span className={styles.title}>{title}</span>
        </div>
      ))}
    </div>
  );
};

export default DataMark;

const dataSet = [
  { color: '#f7d849', title: '카카오' },
  { color: '#4fadf7', title: '페이스북' },
  { color: '#85da47', title: '네이버' },
  { color: '#ac8af8', title: '구글' },
];
