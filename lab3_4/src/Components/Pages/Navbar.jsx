import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import ProductsContext from '../../ContextAPIS/ProductsContext';
import { FaShoppingCart } from 'react-icons/fa'; 

const Navbar = () => {
  let { cartCount } = useContext(ProductsContext);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-center">
              <li className="nav-item">
                <Link className="nav-link active link-light" aria-current="page" to="/">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active link-light" aria-current="page" to="/products/new">Add Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active link-light" aria-current="page" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active link-light" aria-current="page" to="/users/new">Add User</Link>
              </li>
            </ul>
            {/* Cart icon with badge */}
            <div className="position-relative">
              <FaShoppingCart size={24} className="text-white" />
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
