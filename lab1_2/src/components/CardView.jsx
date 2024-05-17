import React, { useState } from 'react';
import useFetchData from '../hooks/useFetchData';

const CardView = () => {
  const { data: productsData, loading, error } = useFetchData("https://dummyjson.com/products");
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); 
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const filteredProducts = productsData.products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container">
      <h2 className="text-center mb-4">Product Card View</h2>
      <div className="mb-4">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search by title..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
      </div>
      <div className="row">
        {currentProducts.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img 
                src={product.thumbnail} 
                className="card-img-top" 
                alt={product.title} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                <p className="card-text"><strong>ID:</strong> {product.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between">
        <button 
          className="btn btn-primary" 
          onClick={handlePreviousPage} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardView;
