// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        leftButton : cc.Button,
        leftButtonLabel : cc.Label,
        showLabel : cc.Label,
        player : cc.Node,
    },

    onButtonClik : function(){
        var length = this.showLabel.string.length;
        var showlabel = cc.find('Canvas/ShowLabel').getComponent(cc.Label);
        console.log(showlabel.string);
        /* 傳送值給 Xcode 的 WKWebView 使用 ocCallJs */
        window.webkit.messageHandlers.ocCallJs.postMessage(length);
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
