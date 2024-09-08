import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Header from './components/Header';
import Home from './pages/Home';
import ProductAdd from './pages/admin/ProductAdd';
import ShowProduct from './pages/admin/ShowProduct';
import EditProduct from './pages/admin/EditProduct';
import ProductPage from './pages/ProductPage';

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
            <Route path="/add" element={<ProductAdd />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/show-product" element={<ShowProduct />} />
            
            {/* Route for viewing the live product page */}
            <Route path="/live-product/:id" element={<ProductPage />} />

            {/* Route for editing a product by its id */}
            <Route path="/edit-product/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
