/**
 * Created by LDQ on 2016/7/26.
 */

var React = require('react');
var Reflux = require('reflux');
var ShoppingCartStore = require('../store/ShoppingCartStore');
var ShoppingCartActions = require('../actions/ShoppingCartActions');

var ShoppingCart = React.createClass({

    mixins:[Reflux.listenTo(ShoppingCartStore, 'onUpdate')],

    getInitialState:function(){
        return {
            shopListDate:ShoppingCartStore.shoppingCartList
        }
    },

    onUpdate:function(){

        this.setState({
            shopListDate:ShoppingCartStore.shoppingCartList
        });
    },
    onChange:function(){
    },

    render: function () {
        var checked = this.state.shopListDate.checked || false;

        return (
            <div>
                <input type="checkbox" checked={checked} onChange={this.onChange}/>
                <span>总价：0</span>
                <ShopList shopListDate={this.state.shopListDate.cartInfos}/>
            </div>
        )
    }
});

var ShopList = React.createClass({
    getDefaultProps:function(){
        return {
            shopListDate:[]

        }
    },
    render: function () {
        var shopListDate = this.props.shopListDate;
        var shopNodes = shopListDate.map(function (shopItem, index) {
            return (
                <ShopItem shopItem={shopItem} key={index}/>
            )
        });

        return (
            <ul>
                {shopNodes}
            </ul>
        )
    }
});

var ShopItem = React.createClass({
    onChange:function(){
        ShoppingCartStore.onCheckedShopItem(this.props.shopItem);
    },
    render:function(){
        var shopItem = this.props.shopItem;
        return (
            <li>
                <input type="checkbox" checked={shopItem.checked} onChange={this.onChange}/>
                <span>{shopItem.shopName}</span>
                <ProductList productListData={shopItem.itemList} />
            </li>
        )
    }

});


var ProductList = React.createClass({

    getInitialState:function(){
        return {
            productListData:this.props.productListData
        }

    },

    render: function () {
        var productListDate = this.state.productListData;

        var productNodes = productListDate.map(function(productItem,index){
            return (
                <ProductItem key={index} productItem={productItem} />
            )
        });
        return (
            <ul >
                {productNodes}
            </ul>
        )
    }
});

var ProductItem = React.createClass({
    checkedProductItem:function(){
        ShoppingCartActions.checkedProductItem(this.props.productItem);
        // ShoppingCartStore.onCheckedProductItem(this.props.productItem);
    },
    render:function(){
        var productItem = this.props.productItem;
        return (
            <li>
                <input type="checkbox" checked={productItem.checked} onChange={this.checkedProductItem}/>
                <span>{productItem.productName}</span>
            </li>
        )

    }
});

module.exports = ShoppingCart;