import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../Store/Actions/UsersAction';

const UserDetails = ({ selectedUser, getUserById }) => {
    const { id } = useParams(); 
    useEffect(() => {
        if (id) {
            getUserById(id);
        }
    }, [getUserById, id]);

    if (!id) {
        return <p>No user ID provided.</p>;
    }

    if (!selectedUser) {
        return <p>Loading user details...</p>;
    }

    return (
        <div className="container mt-5">
            <h2 className='my-4'>User Details</h2>
            <div className="row">
                <div className="col-md-6">
                    <p><strong>ID:</strong> {selectedUser.id}</p>
                    <p><strong>Name:</strong> {selectedUser.name}</p>
                    <p><strong>Username:</strong> {selectedUser.username}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Phone:</strong> {selectedUser.phone}</p>
                    <p><strong>Website:</strong> {selectedUser.website}</p>
                </div>
                <div className="col-md-6">
                    <p><strong>Company:</strong></p>
                    <ul>
                        <li><strong>Name:</strong> {selectedUser.company.name}</li>
                        <li><strong>Catch Phrase:</strong> {selectedUser.company.catchPhrase}</li>
                        <li><strong>BS:</strong> {selectedUser.company.bs}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    selectedUser: state.users.selectedUser,
});

export default connect(mapStateToProps, { getUserById })(UserDetails);
