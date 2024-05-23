import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductsContext from '../../ContextAPIS/ProductsContext';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { CreateProduct, UpdateProduct, GetProductById } = useContext(ProductsContext);
    const [product, setProduct] = useState({ name: '', price: '', quantity: '', imgUrl: '' });
    const isEdit = Boolean(id);

    useEffect(() => {
        if (isEdit) {
            GetProductById(id).then(product => setProduct(product));
        }
    }, [id, GetProductById, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            UpdateProduct(id, product).then(() => navigate('/products'));
        } else {
            CreateProduct(product).then(() => navigate('/products'));
        }
    };

    return (
        <div>
            <h1 className="mt-5">{isEdit ? 'Edit Product' : 'Create Product'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input type="number" className="form-control" name="quantity" value={product.quantity} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input type="text" className="form-control" name="imgUrl" value={product.imgUrl} onChange={handleChange} />
                </div>
                <div className='pt-2'>
                    <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
