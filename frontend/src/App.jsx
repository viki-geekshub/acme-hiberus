import React from 'react';
import './App.css';
import './index.scss';
import 'antd/dist/antd.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './containers/user/Login/Login';
import Register from './containers/user/Register/Register';
import Home from './containers/movies/Home/Home';
import Details from './containers/movies/Details/Details';
import Search from './containers/movies/Search/Search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/details/:id' component={Details} exact />
          <Route path='/search/:search' component={Search} exact />
          <Route path='/' component={Home} exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
