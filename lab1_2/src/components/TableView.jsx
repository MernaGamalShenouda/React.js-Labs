import React, { Component } from 'react';
import axios from 'axios';

class Tasks extends Component {
    state = {
        users: [],
        currentPage: 1,
        usersPerPage: 5,
        loading: true,
        error: null
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        axios.get("https://dummyjson.com/users")
            .then(res => {
                this.setState({ users: res.data.users, loading: false });
                console.log(res.data);
            })
            .catch(err => {
                this.setState({ error: err.message, loading: false });
            });
    }

    nextPage = () => {
        this.setState(prevState => ({
            currentPage: prevState.currentPage + 1
        }));
    }

    prevPage = () => {
        this.setState(prevState => ({
            currentPage: prevState.currentPage - 1
        }));
    }

    render() {
      const { users, currentPage, usersPerPage, loading, error } = this.state;
  
      if (!Array.isArray(users)) {
          return <div>Error: Users data is not in the expected format.</div>;
      }
  
      const indexOfLastUser = currentPage * usersPerPage;
      const indexOfFirstUser = indexOfLastUser - usersPerPage;
      const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
      return (
          <div className="container">
              <div className="row justify-content-center">
                  <div className="col-md-8">
                      <h2 className="text-center mb-4">Users Component</h2>
                      {loading ? <div>Loading...</div> :
                          error ? <div>Error: {error}</div> :
                              <>
                                  <table className="table table-striped">
                                      <thead>
                                          <tr>
                                              <th>ID</th>
                                              <th>Name</th>
                                              <th>Email</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {currentUsers.map(user => (
                                              <tr key={user.id}>
                                                  <td>{user.id}</td>
                                                  <td>{user.firstName}</td>
                                                  <td>{user.email}</td>
                                              </tr>
                                          ))}
                                      </tbody>
                                  </table>
                                  <div className="d-flex justify-content-center">
                                      <button
                                          className="btn btn-dark mx-2"
                                          onClick={this.prevPage}
                                          disabled={currentPage === 1}
                                      >
                                          Previous
                                      </button>
                                      <button
                                          className="btn btn-dark mx-2"
                                          onClick={this.nextPage}
                                          disabled={indexOfLastUser >= users.length}
                                      >
                                          Next
                                      </button>
                                  </div>
                              </>
                      }
                  </div>
              </div>
          </div>
      );
  }
  
  
}

export default Tasks;
