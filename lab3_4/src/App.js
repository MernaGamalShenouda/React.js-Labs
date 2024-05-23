import React from 'react';
import StandaredErrorBoundary from './Components/StandaredErrorBoundary.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Pages/Navbar.jsx';
import Products from './Components/Pages/Products.jsx';
import ProductDetails from './Components/Pages/ProductDetails.jsx';
import NotFound from './Components/Pages/NotFound.jsx';
import Users from './Components/Pages/Users.jsx';
import UserDetails from './Components/Pages/UserDetails.jsx';
import { ProductsContextProvider } from './ContextAPIS/ProductsContext.jsx';
import ProductForm from './Components/Pages/ProductForm.jsx';
import UserForm from './Components/Pages/UserForm.jsx';

const App = () => {
  return (
    <div>
      <StandaredErrorBoundary>
      <ProductsContextProvider>
        <BrowserRouter>
        <Navbar />
        <div className='container'>
              <Routes> 
                {["products", "/"].map((path, index) => (
                  <Route path={path} element={<Products />} key={index} />
                ))}
                <Route path="/products/new" element={<ProductForm />} />
                <Route path="/products/:id/edit" element={<ProductForm />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/new" element={<UserForm />} />
                <Route path="/users/:id/edit" element={<UserForm />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
          </div>
        </BrowserRouter>
        </ProductsContextProvider>
      </StandaredErrorBoundary>
    </div>
  );
};

export default App;
