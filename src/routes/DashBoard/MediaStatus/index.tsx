import MediaChart from './MediaChart/MediaChart';
import MediaTable from './MediaTable/MediaTable';
import DataMark from './DataMark/DataMark';

import styles from './mediaStatus.module.scss';

const MediaStatus = () => {
  return (
    <div className={styles.mediaStatusWrap}>
      <h2 className={styles.title}>매체 현황</h2>
      <div className={styles.chartWrap}>
        <MediaChart />
        <DataMark />
        <MediaTable />
      </div>
    </div>
  );
};

export default MediaStatus;
