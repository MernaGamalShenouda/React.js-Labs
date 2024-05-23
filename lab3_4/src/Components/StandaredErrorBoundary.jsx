import React, { Component } from 'react';
import ErrorPage from './ErrorPage.jsx';

class StandaredErrorBoundary extends Component {
    constructor(){
        super()
        this.state = {
            hasError:false,
            error:undefined
        }
    }
    static getDerivedStateFromError(error){
        return{
            hasError:true,
            error:error
        }
    }

    componentDidCatch(error,errorInfo){
        console.log("we caught an error", error,errorInfo);
    }
    render() {
        return (
            <div>
                {this.state.hasError? <ErrorPage/> : this.props.children}
            </div>
        );
    }
}

export default StandaredErrorBoundary;