import MediaChart from './MediaChart/MediaChart';
import MediaTable from './MediaTable/MediaTable';
import DataMark from './dataMark/DataMark';

import styles from './mediaStatus.module.scss';

const MediaStatus = () => {
  return (
    <div className={styles.mediaStatusWrap}>
      <h1 className={styles.title}>매체 현황</h1>
      <div className={styles.chartWrap}>
        <MediaChart />
        <DataMark />
        <MediaTable />
      </div>
    </div>
  );
};

export default MediaStatus;
