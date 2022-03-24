import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Layout from '../Pages/Layout';
import Start from '../Pages/Start';
import Overview from '../Pages/Overview';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Start />} />

    <Route path="/" element={<Layout />}>
      <Route path="/overview" element={<PrivateRoute />}>
        <Route path="/overview" element={<Overview />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
