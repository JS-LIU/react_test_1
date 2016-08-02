/**
 * Created by LDQ on 2016/7/25.
 */

// var React = require('react');
import React  from 'react';
var ReactDOM = require('react-dom');
var { Router, Route, Link, hashHistory, } = require('react-router');
var $ = require('jquery');
var HomePage = require('../src/HomePage');
var ShoppingCart = require('../src/ShoppingCart');
var My = require('../src/My');


ReactDOM.render(
    (
        <Router history={hashHistory}>

            <Route path="/" component={HomePage}></Route>
            <Route path="/shoppingCart" component={ShoppingCart}></Route>
            <Route path="/my" component={My}></Route>

        </Router>
    ),
    document.getElementById('app')
);