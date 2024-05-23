import axios from 'axios';
import React, { createContext, useEffect, useMemo, useReducer, useCallback } from 'react';

const ProductsContext = createContext();

const initialState = {
    Products: null,
    cartCount: 0
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, Products: action.payload };
        case 'INCREMENT_CART_COUNT':
            return { ...state, cartCount: state.cartCount + 1 };
        default:
            return state;
    }
};

export const ProductsContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { Products, cartCount } = state;
    const { children } = props;

    const addToCart = useCallback(() => {
        dispatch({ type: 'INCREMENT_CART_COUNT' });
    }, []);

    const GetAllProducts = useCallback(() => {
        axios.get("http://localhost:2000/products")
            .then(res => dispatch({ type: 'SET_PRODUCTS', payload: res.data }))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        GetAllProducts();
    }, [GetAllProducts]);

    const ContextValue = useMemo(() => ({
        Products,
        GetProductById: id => axios.get(`http://localhost:2000/products/${id}`).then(res => res.data),
        CreateProduct: product => axios.post("http://localhost:2000/products", product).then(res => res.data),
        UpdateProduct: (id, updatedProduct) => axios.put(`http://localhost:2000/products/${id}`, updatedProduct).then(res => res.data),
        DeleteProduct: id => axios.delete(`http://localhost:2000/products/${id}`).then(() => {}),
        addToCart,
        cartCount
    }), [Products, addToCart, cartCount]);

    return (
        <ProductsContext.Provider value={ContextValue}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContext;
