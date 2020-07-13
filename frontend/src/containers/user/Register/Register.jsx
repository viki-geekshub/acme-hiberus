import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Register.scss';
import { register } from '../../../redux/actions/users';
import {  notification } from 'antd';

const Register = props => {
    const handleSubmit = event =>{
        event.preventDefault();
        const user ={
            username:event.target.username.value,
            email:event.target.email.value,
            password:event.target.password.value
        }
        register(user).then(res => {
            notification.success({message:'Register',description:res.data.message})
            setTimeout(() => {
                props.history.push('/login')
            }, 1500);
        })
        .catch(()=>{
            notification.error({message:'Register',description:'There was a problem registering.'})
        })
    }
    return (
        <div className="registerContainer">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <TextField type="text" label="Username" name="username" placeholder="Insert your username" className="input" required autoFocus />
                <TextField type="email" label="Email" name="email" placeholder="Insert your email" className="input" required />
                <TextField type="password" label="Password" name="password" placeholder="Insert your password" className="input" required />
                <Button type="submit" variant="contained" color="primary">
                    Register
                </Button>
            </form>
        </div>
    )
}

export default Register;
