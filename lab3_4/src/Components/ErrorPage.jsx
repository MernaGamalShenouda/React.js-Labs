import React, { Component } from 'react';

class ErrorPage extends Component {
    render() {
        return (
            <div>
               <h1 className='alert alert-danger mt-5'>Oops...</h1> 
            </div>
        );
    }
}

export default ErrorPage;