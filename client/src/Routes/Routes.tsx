import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Layout from '../Pages/Layout';
import Start from '../Pages/Start';
import Overview from '../Pages/Overview';
import Checkout from '../Pages/Checkout';
import Account from '../Pages/Account';
import Admin from '../Pages/Admin';

import Items from '../Pages/Admin/Items';
import EditItem from '../Pages/Admin/Items/EditItem';
import CreateItem from '../Pages/Admin/Items/CreateItem';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Start />} />

    <Route path="/" element={<PrivateRoute />}>
      <Route path="/" element={<Layout />}>
        <Route path="/cafeteria" element={<Overview />} />
        <Route path="/cafeteria/checkout" element={<Checkout />} />

        <Route path="/account" element={<Account />} />
      </Route>
    </Route>

    <Route path="/" element={<PrivateRoute admin={true} />}>
      <Route path="/" element={<Layout />}>
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/items" element={<Items />} />
          <Route path="/admin/items/new" element={<CreateItem />} />
          <Route path="/admin/items/:id" element={<EditItem />} />
        </Route>
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
