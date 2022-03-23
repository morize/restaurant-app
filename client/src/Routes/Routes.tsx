import { Routes, Route, Outlet } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Start from '../Pages/Start';
import Overview from '../Pages/Overview';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Start />} />

    <Route path="/overview" element={<PrivateRoute />}>
      <Route path="/overview" element={<Overview />} />
    </Route>
  </Routes>
);

export default AppRoutes;
