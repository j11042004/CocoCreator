(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/javaScript/LeftButtonScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5383dAYyJ1HAZCvqK2xtVBC', 'LeftButtonScript', __filename);
// javaScript/LeftButtonScript.js

'use strict';

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
        leftButton: cc.Button,
        leftButtonLabel: cc.Label,
        showLabel: cc.Label,
        player: cc.Node
    },

    onButtonClik: function onButtonClik() {
        var length = this.showLabel.string.length;
        var showlabel = cc.find('Canvas/ShowLabel').getComponent(cc.Label);
        console.log(showlabel.string);
        /* 傳送值給 Xcode 的 WKWebView 使用 ocCallJs */
        window.webkit.messageHandlers.ocCallJs.postMessage(length);
    },

    // onLoad () {},

    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=LeftButtonScript.js.map
        