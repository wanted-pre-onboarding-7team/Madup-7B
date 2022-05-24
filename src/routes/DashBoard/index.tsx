import Calendar from 'routes/DashBoard/Calendar';
import DashBoardChart from 'routes/DashBoard/DashBoardChart';
import MediaStatus from 'routes/DashBoard/MediaStatus';

const Dashboard = () => {
  return (
    <div>
      <Calendar />
      <DashBoardChart />
      <MediaStatus />
    </div>
  );
};

export default Dashboard;
