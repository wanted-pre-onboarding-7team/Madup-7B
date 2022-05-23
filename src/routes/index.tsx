import { Routes, Route, Router } from 'react-router-dom';
import styles from './Routes.module.scss';
import Sidebar from 'components/Sidebar';
// import Header from 'components/Header';
const App = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<SearchMovie />} /> */}
      <Route path='/advertisement' element={<Sidebar />} />
    </Routes>
  );
};

export default App;
