import React, { useContext ,useState } from 'react';
import { useMutation } from '@apollo/client';
import { POST_LOGIN } from '../graphql/loginquery';
import { useNavigate } from "react-router-dom";
import { TokenContext } from '../context';


const Login = () => { 

    const { setUserToken } = useContext(TokenContext);
    const navigate = useNavigate();
    const [login, setLogin] = useState({
        username: "",
        password: ""
    });

    const [postLogin, { data, loading, error }] = useMutation(POST_LOGIN);

    function handleLogin(e) {
        const { name, value } = e.target;
        setLogin(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    function submitLogin(e) {
        e.preventDefault();
         
        postLogin({
            variables: {
                input: {
                    username: login.username,
                    password: login.password
                }
            }
        }).then(response => {
            if (response.data && response.data.login.token) {
                // Store token in localStorage
                setUserToken(response.data.login.token);
                localStorage.setItem('usertoken', response.data.login.token);
               
                navigate("/userlist");
            }
        }).catch(err => {
            console.error('Error during login:', err);
        });
       
    }

    if (loading) return 'Loading...';
    if (error) return `Submission error! ${error.message}`;
  // if(data) return  navigate("/userlist");

    return (
        <>
            <form onSubmit={submitLogin}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={login.username}
                    onChange={handleLogin} 
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={login.password}
                    onChange={handleLogin} 
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default Login;
