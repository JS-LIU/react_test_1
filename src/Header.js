/**
 * Created by LDQ on 2016/7/26.
 */
var React = require('react');

var Header = React.createClass({
    render: function () {
        return (
            <div className="tc">{this.props.pageName}</div>
        )
    }
});
module.exports=Header;