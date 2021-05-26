import React, { useState } from 'react';
import axios from "axios";
import './Login.css';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';


function Login({ page }) {

    const history = useHistory();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    const { id } = useParams();

    const register = (e) => {
        
        if (name.length === 0 || email.length === 0 || age.length === 0) {
            alert("Please Fill the Missing Entries");
            return;
        }
        
        if (page === "register") {
            e.preventDefault();

            axios.post("https://mern-stck-backend.herokuapp.com/users", {
                name: name,
                email: email,
                age: age,
            }).catch(err => alert(err));


            setName("");
            setEmail("");
            setAge("");
        }
        else {
            axios.put(`https://mern-stck-backend.herokuapp.com/users/${id.slice(1)}`, {
                name: name,
                email: email,
                age: age,
            }).catch(err => alert(err));
        }

        history.push("/users");
    }

    
    return (
        <div className="login">
            <div className="login__body">
                <h2>{page}</h2>
                
                <form>
                    <div className="login__bodyInput">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter Your Full Name" value={name} onChange = {(e) => setName(e.target.value)} />
                    </div>

                    <div className="login__bodyInput">
                        <label>Email</label>
                        <input type="email" placeholder="Enter Your Email" value={email} onChange = {(e) => setEmail(e.target.value)}/>
                    </div>


                    <div className="login__bodyInput">
                        <label>Age</label>
                        <input type="number" placeholder="Enter the Age" value={age} onChange = {(e) => setAge(e.target.value)}/>
                    </div>

                    <button type="submit" onClick={register}>{page}</button>
                    <span>Want to Check All User? {"   "}<Link to="/users">Click Here</Link> </span>
                </form>

                
            </div>
            
        </div>
    )
}

export default Login
