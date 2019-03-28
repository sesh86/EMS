import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// eslint-disable-next-line
import App from './App';
import Login from './Components/Login'
import Enquiries from './Components/Enquiries'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './Reducers/rootReducer'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom'

const store = createStore(rootReducer);



ReactDOM.render(
<Provider store={store}>
<BrowserRouter>
<Route exact path="/Login" component={Login}/>
<Route exact path="/" component={Enquiries}/>
</BrowserRouter>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
