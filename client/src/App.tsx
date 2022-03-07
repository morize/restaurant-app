import { Routes, Route } from 'react-router-dom';

import Overview from './Pages/Overview';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Overview />} />
      </Routes>
    </div>
  );
};

export default App;
