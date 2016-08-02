/**
 * Created by LDQ on 2016/7/26.
 */
var React = require('react');
var Css = require('../css/styles.css');

var My = React.createClass({
    render: function () {
        console.log(Css);
        return (
            <div className="my">
                我
            </div>
        )
    }
});
module.exports = My;