import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsContext from '../../ContextAPIS/ProductsContext';

const ProductDetails = () => {
    const { id } = useParams();
    const { GetProductById, addToCart } = useContext(ProductsContext);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        GetProductById(id).then(setProduct);
    }, [id, GetProductById]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mt-5">Product Details</h1>
            <div className="card">
                <img src={product.imgUrl ? product.imgUrl : "https://source.unsplash.com/random"} className="card-img-top" alt={product.name} />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: ${product.price}</p>
                    <p className="card-text">Quantity: {product.quantity}</p>
                </div>
                <button className="btn btn-success" onClick={() => addToCart(product.id)}>Add to Cart</button>

            </div>
        </div>
    );
};

export default ProductDetails;
