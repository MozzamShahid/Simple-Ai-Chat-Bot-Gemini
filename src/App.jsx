import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ImagePage from './pages/[imageId]';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:imageId" element={<ImagePage />} />  {/* Dynamic Route */}
      </Routes>
    </Router>
  );
}

export default App;
