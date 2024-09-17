import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

import './App.css';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header will be present on all pages */}
        <Header />

        {/* Routes for different pages */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
