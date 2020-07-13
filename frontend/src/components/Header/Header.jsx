import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss';
import { logout } from '../../redux/actions/users';
import { notification } from 'antd';
import { Input } from 'antd';
// import { AudioOutlined } from '@ant-design/icons';

const Header = props => {
    const history = useHistory();
    const logOut = () => {
        logout()
        .then(res => {
            notification.success({ message: 'Logout', description: res.data.message ,duration:2000})
            setTimeout(() => {
                history.push('/login');
            }, 2000);
        })
        .catch(()=>{
            notification.error({ message: 'Logout', description: 'There was a problem disconnecting.'})
        })
    }
    const { Search } = Input;
    // const suffix = (
    //         <AudioOutlined
    //           style={{
    //             fontSize: 16,
    //             color: '#1890ff'
    //           }}
    //         />
    //       );
    const onChange = event => {
        const search = event.target.value;
        history.push('/search/' + search);
    }
    
    return (
        <header className="header">
            <Search className="searchBox" placeholder="Find your movie" onChange={onChange} onSearch={value => console.log(value)} enterButton />
            <NavLink to='/' className="size" exact>Popular Movies</NavLink>
            {props.user ?
                <div className="userZone">
                    <span className="user size">{props.user.username}</span>
                    <span onClick={logOut} className="logout size">
                        Logout
                    </span>
                </div> : <div className="guestZone">
                    <NavLink to='/login' className="size" exact>Login</NavLink>
                    <NavLink to='/register' className="size" exact>Register</NavLink>
                </div>
            }
        </header>
    )
}

const mapStateToProps = (state) => ({ user: state.user.user});
export default connect(mapStateToProps)(Header);