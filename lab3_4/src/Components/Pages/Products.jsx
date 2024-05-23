import React, { useContext } from 'react';
import ProductsContext from '../../ContextAPIS/ProductsContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
    let { Products, DeleteProduct, addToCart } = useContext(ProductsContext);

    const handleDelete = (id) => {
        DeleteProduct(id);
    };

    return (
        <div>
            <h1 className="mt-5">Products Page</h1>
            <div className="row">
                {Products && Products.map(prd => (
                    <div className="col-md-3 col-sm-6 mb-4" key={prd.id}>
                        <div className="card h-100">
                            <img src={prd.imgUrl ? prd.imgUrl : "https://source.unsplash.com/random"} className="card-img-top" height="150" alt={prd.name} />
                            <div className="card-body">
                                <h5 className="card-title">{prd.name}</h5>
                                <p className="card-text">Price: ${prd.price}</p>
                            </div>
                            <div className="card-footer">
                                <div className="d-grid gap-2">
                                    <Link className="btn btn-primary" to={`/products/${prd.id}`}>Show More</Link>
                                    <Link className="btn btn-warning" to={`/products/${prd.id}/edit`}>Update</Link>
                                    <button className="btn btn-danger" onClick={() => handleDelete(prd.id)}>Delete</button>
                                    <button className="btn btn-success" onClick={() => addToCart(prd.id)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
