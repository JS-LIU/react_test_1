/**
 * Created by LDQ on 2016/7/26.
 */
import React  from 'react';
var {Link} = require('react-router')

var Footer = React.createClass({

    getInitialState:function(){
        return {data:[{name:'首页',url:"/"},{name:'购物车',url:"/shoppingCart"},{name:'我',url:"/my"}]}
    },

    render: function () {
        var footerList = this.state.data.map(function(footer,index){
            return (
                <li className="fl" key={index} >
                    <Link to={footer.url}>{footer.name}</Link>
                </li>
            )
        });

        return(
            <ul>
                {footerList}
            </ul>
        )
    }
});

module.exports=Footer;