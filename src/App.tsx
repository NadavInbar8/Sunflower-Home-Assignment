import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import CityPage from './pages/Citypage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/city/:cityName" element={<CityPage />} />
    </Routes>
  );
}

export default App;