import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ImagePage from './pages/ImagePage';  // Import the dynamic ImagePage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imagepage/:id" element={<ImagePage />} />  {/* Dynamic route */}
      </Routes>
    </Router>
  );
}

export default App;