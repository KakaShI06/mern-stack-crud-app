import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './User.css';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function User() {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {
      axios.get("https://mern-stck-backend.herokuapp.com/users")
        .then((res) => setUsers(res.data))
    }, [users])


    const selectId = (id) => {
        if (selectedId === id) {
            setSelectedId("");
            return;
        }
        setSelectedId(id);
    }

    const deleteUser = () => {
        axios.delete(`https://mern-stck-backend.herokuapp.com/users/${selectedId}`)
            .then(res => console.log(res))
            .catch(err => alert(err));
        
        setSelectedId("");
    }

    const editUser = () => {
        history.push(`edit/:${selectedId}`);
    }

    return (
        <div className = "user">
            <div className="user__body">
                <h2>List Of All the Users</h2>
                <span className="link">Want to add new User?{"   "}<Link to='/login'>Click Here</Link> </span>
                


                <table>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                    </tr>

                    
                    {users.map((user) => (
                        <tbody>
                            
                            <tr key = {user._id} onClick={() => selectId(user._id)}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.email}</td>
                            </tr>

                            {selectedId === user._id && (<div className="user__expandingWindow">
                                <button onClick={editUser}>Edit</button>
                                <button onClick= {deleteUser}>Delete</button>
                            </div>)}
                        </tbody>
                    ))}
                    </table>
            </div>
        </div>
    )
}

export default User
