/**
 * Created by LDQ on 2016/7/26.
 */
var React = require('react');
var Footer = require('../src/Footer.js');
var Header = require('../src/Header.js');


var HomePage = React.createClass({
    render: function () {
        return (
            <div>
                <Header pageName="私家茶庄"/>
                <p>Hello</p>
                <Footer />
            </div>
        )
    }
});
module.exports = HomePage;
