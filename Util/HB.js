/**
 * Created by 殿麒 on 2016/6/28.
 */

/**
 *  HB.obj
 *      HB.obj.toEquals
 *      HB.obj.addProp
 *      HB.obj.isEmpty
 *
 *  HB.arrObj
 *      HB.arrObj.findObjs
 *      HB.arrObj.findIndex
 *      HB.arrObj.deleteObjs
 *
 *  HB.ajax
 *      HB.get  内部只使用了new XMLHttpRequest(); 所以可能不兼容部分IE浏览器
 *      HB.post
 *      HB.ajax
 */



window.HB = window.HB || {};

HB.obj = (function(){


    //  判断obj1 中的属性 是否和obj2中的所有属性相等
    var toEquals = function(obj1,obj2){

        var flag = true;

        for(var prop in obj2){

            if(obj1[prop] != obj2[prop]){

                flag = false;

                break;

            }

        }

        return flag;

    };

    var addProp = function(obj,addedProp,bool = "fasle"){

        if(bool){

            for(var prop in addedProp){

                obj[prop] = addedProp[prop];

            }

        }else{

            for(var prop in addedProp){

                if(!obj[prop]){

                    obj[prop] = addedProp[prop];

                }

            }

        }

        return obj;

    };

    var isEmpty = function(obj){

        var proparr = [];

        for(var prop in obj){

            proparr.push(prop);

        }

        if(proparr.length == 0){

            return true;

        }else{

            return false;

        }

    };

    return {

        toEquals:toEquals,

        addProp:addProp,

        isEmpty:isEmpty
    }

})();


HB.arrObj = (function(){


    var findObjs = function(findedList,condition){

        var fitsList = [];

        for(var i = 0,len = findedList.length; i < len;i++){

            if(HB.obj.toEquals(findedList[i],condition)){

                fitsList.push(findedList[i]);

            }

        }

        return fitsList;

    };

    var findIndex = function(findedList,condition){

        var fitsIndex = [];

        for(var i = 0,len = findedList.length; i < len;i++){

            if(HB.obj.toEquals(findedList[i],condition)){

                fitsIndex.push(i);

            }

        }

        return fitsIndex;

    };

    var deleteObjs = function(deletedList,condition){

        var newList = [];

        for(var i = 0,len = deletedList.length; i < len;i++){

            if(!HB.obj.toEquals(deletedList[i],condition)){

                newList.push(deletedList[i]);

            }

        }

        return newList;

    };

    var isEmpty = function(arr){


        if(arr.length == 0){

            return true;

        }else{

            return false

        }

    };

    return {

        findObjs:findObjs,

        findIndex:findIndex,

        deleteObjs:deleteObjs,

        isEmpty:isEmpty

    }

})();

HB.ajax = (function(){

    var getJSON = function(url){

        return new Promise(function(resolve,reject){

            var client = new XMLHttpRequest();

            client.open("GET",url);

            client.onreadystatechange = handler;

            client.responseType = "json";

            client.setRequestHeader("Accept","application/json");

            client.send();

            function handler(){

                if(this.readyState !==4 ){

                    return;

                }

                if(this.status >= 200 && this.status < 300 || this.status == 304){

                    resolve(this.response);

                }else {

                    reject(new Error(this.statusText));

                }
            }

        });

    };


    return {

        get:getJSON

        // post:postJSON,
        //
        // ajax:ajax
    }
})();

module.exports = HB;