/**
 * Created by LDQ on 2016/7/26.
 */
var Reflux = require('reflux');
var $ = require('jquery');
var HB = require('../Util/HB');

class ShoppingCart {
    constructor(cart,props){
        this.cart = HB.obj.addProp(cart,props);
        this.addProps(this.cart.cartInfos,props);

    }

    addProps(list,props){
        var self = this;

        list.map(function(item){
            HB.obj.addProp(item,props);

            if(item.itemList){
                self.addProps(item.itemList,props);
            }

        });
        return list;
    }

}

var ShoppingCartStore = Reflux.createStore({

    init:function(){
        var self = this;
        this.getShoppingCart().then(function(data){
            console.log('getData---',data);
            self.shoppingCartList = (new ShoppingCart(data,{price:0,checked:false,num:1})).cart;
            self.trigger();
        });
    },

    getShoppingCart:function(){

        return HB.ajax.get('/data/shoppingCartData.json');

    },

    onCheckedProductItem:function(productItem){
        //  isCheckedShop
        var shopId = productItem.shopId;
        var productId = productItem.itemId;
        var shopIndex = this.shoppingCartList.cartInfos.findIndex(function(shopItem){
            return shopItem.shopId == shopId;
        });
        var productIndex = this.shoppingCartList.cartInfos[shopIndex].itemList.findIndex(function(productItem){
            return productItem.itemId == productId;
        });
        this.shoppingCartList.cartInfos[shopIndex].itemList[productIndex].checked = !this.shoppingCartList.cartInfos[shopIndex].itemList[productIndex].checked;
        var productUncheckedIndex = this.shoppingCartList.cartInfos[shopIndex].itemList.findIndex(function(productItem){
            return productItem.checked == false;
        });
        if(productUncheckedIndex != -1){
            this.shoppingCartList.cartInfos[shopIndex].checked = false;
        }else{
            this.shoppingCartList.cartInfos[shopIndex].checked = true;
        }
        var shopItemUncheckedIndex = this.shoppingCartList.cartInfos.findIndex(function(shoipItem){
            return shoipItem.checked == false;
        });
        if(shopItemUncheckedIndex != -1){
            this.shoppingCartList.checked = false;
        }else{
            this.shoppingCartList.checked = true;
        }

        this.trigger();
    },
    onCheckedShopItem:function(shopItem){
        var self = this;
        var shopId = shopItem.shopId;
        var shopIndex = this.shoppingCartList.cartInfos.findIndex(function(shopItem){
            return shopItem.shopId == shopId;
        });
        this.shoppingCartList.cartInfos[shopIndex].checked = !this.shoppingCartList.cartInfos[shopIndex].checked;

        this.shoppingCartList.cartInfos[shopIndex].itemList.map(function(productItem){
            productItem.checked = self.shoppingCartList.cartInfos[shopIndex].checked;
        });
        var shopItemUncheckedIndex = this.shoppingCartList.cartInfos.findIndex(function(shoipItem){
            return shoipItem.checked == false;
        });
        console.log('shopItemUncheckedIndex---',shopItemUncheckedIndex);
        if(shopItemUncheckedIndex != -1){
            this.shoppingCartList.checked = false;
        }else{
            this.shoppingCartList.checked = true;
        }

        this.trigger();
    },

    shoppingCartList:{},

});




module.exports = ShoppingCartStore;