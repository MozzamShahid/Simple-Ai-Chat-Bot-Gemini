import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ImagePage from './pages/ImagePage'; // Import the new ImagePage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imagepage/:id" element={<ImagePage />} /> {/* Dynamic Route */}
      </Routes>
    </Router>
  );
}

export default App;
