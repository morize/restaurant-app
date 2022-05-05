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
import Orders from '../Pages/Admin/Orders';
import ViewOrder from '../Pages/Admin/Orders/ViewOrder';
import Users from '../Pages/Admin/Users';

const AppRoutes = () => (
  <Routes>
    <Route path="/app" element={<Start />} />
    <Route path="/app/about" element={<Start />} />

    <Route path="/app" element={<PrivateRoute />}>
      <Route path="/app" element={<Layout />}>
        <Route path="/app/cafeteria" element={<Overview />} />
        <Route path="/app/cafeteria/:category" element={<Overview />} />
        <Route path="/app/cafeteria/checkout" element={<Checkout />} />

        <Route path="/app/account" element={<Account />} />
      </Route>
    </Route>

    <Route path="/app" element={<PrivateRoute admin={true} />}>
      <Route path="/app" element={<Layout />}>
        <Route path="/app/admin" element={<Admin />}>
          <Route path="/app/admin/items" element={<Items />} />
          <Route path="/app/admin/items/new" element={<CreateItem />} />
          <Route path="/app/admin/items/:id" element={<EditItem />} />

          <Route path="/app/admin/orders" element={<Orders />} />
          <Route path="/app/admin/orders/:id" element={<ViewOrder />} />

          <Route path="/app/admin/users" element={<Users />} />
          <Route path="/app/admin/users/:id" element={<ViewOrder />} />
        </Route>
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
