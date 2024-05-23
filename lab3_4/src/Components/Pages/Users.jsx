import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../../Store/Actions/UsersAction';
import { Link } from 'react-router-dom';

const Users = ({ userList, getUsers, deleteUser }) => {
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleDelete = (userId) => {
        deleteUser(userId);
    };

    return (
        <div>
            <h1 className="mt-5">Users</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <Link to={`/users/${user.id}`} className="btn btn-primary mx-2 ">Show More</Link>
                                <button onClick={() => handleDelete(user.id)} className="btn btn-danger mr-2">Delete</button>
                                <Link to={`/users/${user.id}/edit`} className="btn btn-warning mx-2 ">Update</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = state => ({
    userList: state.users.list
});

const mapDispatchToProps = {
    getUsers,
    deleteUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
