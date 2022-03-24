import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Layout from '../Pages/Layout';
import Start from '../Pages/Start';
import Overview from '../Pages/Overview';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Start />} />

    <Route path="/" element={<Layout />}>
      <Route path="/cafeteria" element={<PrivateRoute />}>
        <Route path="/cafeteria" element={<Overview />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
