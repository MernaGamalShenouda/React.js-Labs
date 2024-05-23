import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createUser, updateUser, getUserById } from '../../Store/Actions/UsersAction';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = ({ user, createUser, updateUser, getUserById }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        if (id) {
            getUserById(id);
        } else {
            setFormData({ name: '', email: '', phone: '' });
        }
    }, [id, getUserById]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateUser(id, formData).then(() => navigate('/users'));
        } else {
            createUser(formData).then(() => navigate('/users'));
        }
    };

    return (
        <div>
            {/* Conditional rendering based on whether id is provided */}
            <h1 className="mt-5">{id ? 'Edit User' : 'Create User'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className='mt-2'>
                    <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.users.selectedUser,
});

const mapDispatchToProps = {
    createUser,
    updateUser,
    getUserById
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
