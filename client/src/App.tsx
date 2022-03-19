import { Routes, Route } from 'react-router-dom';
import Start from './Pages/Start';
import Overview from './Pages/Overview';

const App = () => {
  return (
    <div className="bg-start bg-cover h-screen">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </div>
  );
};

export default App;
