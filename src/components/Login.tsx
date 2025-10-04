import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
        const navigate = useNavigate();
    const [user, setUser] = useState({username: "mahesh", password: "mahesh@123"});
    const OnTextChange = (e) => {
        const replicaUser = {...user};
        replicaUser[e.target.name] = e.target.value;
        setUser(replicaUser);
    }

    const SignIn = () => {
    axios.post('http://localhost:9999/signin', user).then((result) => {
        if(result.data.jwtoken != undefined) {
        localStorage.setItem("token", result.data.jwtoken);
        localStorage.setItem("isLoggedIn", "true");
        navigate('/dashboard', {replace: true})
        } else {
                    localStorage.removeItem("isLoggedIn");
        }
    }).catch((err) => {
                console.log(err);
    });
    }

    return ( <>
    <h1>User Name:</h1>
    <input type="text" name="username" value={user.username}
    onChange={OnTextChange}/>
    <hr />
    <h1>Password:</h1>
    <input type="password" name="password" value={user.password}
    onChange={OnTextChange}/>
    <hr />
    <button onClick={SignIn}>Login</button>
    </> );
}

export default Login;