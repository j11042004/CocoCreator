(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/javaScript/RightButtonScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1d3cfwQw2pA+6Ql+RTCTh9c', 'RightButtonScript', __filename);
// javaScript/RightButtonScript.js

"use strict";

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
        showLabel: cc.Label,
        rightButton: cc.Button,
        rightuttonLabel: cc.Label,
        getString: cc.String,
        player: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:
    onBttonClick: function onBttonClick() {
        if (this.getString === "Hello Game") {
            this.getString = "Send Word";
        } else {
            this.getString = "Hello Game";
        }
        this.showLabel.string = this.getString;
        alert('Hello');
        /* 傳送值給 Xcode 的 WKWebView 使用 ocCallJs */
        window.webkit.messageHandlers.ocCallJs.postMessage(this.getString);
    },

    onLoad: function onLoad() {},

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
        //# sourceMappingURL=RightButtonScript.js.map
        