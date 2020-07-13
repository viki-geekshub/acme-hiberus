import React from 'react';
import './Login.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { login } from '../../../redux/actions/users';
import { notification } from 'antd';

const Login = props => {
    const handleSubmit = event => {
        event.preventDefault();
        const user = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        login(user)
        .then(res => {
            notification.success({ message: 'Login', description: res.data.message ,duration:2000})
            setTimeout(() => {
                props.history.push('/');
            }, 2000);
        })
        .catch(()=>{
            notification.error({ message: 'Login', description: 'There was a problem connecting.'})
        })
    }
    return (
        <div className="loginContainer">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <TextField type="text" label="Username" name="username" placeholder="
                    Insert your username" className="input" required autoFocus />
                <TextField type="password" label="Password" name="password" placeholder="
                    Insert your password" className="input" required />
                <Button type="submit" variant="contained" color="primary">
                    Login
                </Button>
            </form>
        </div>
    )
}

export default Login;