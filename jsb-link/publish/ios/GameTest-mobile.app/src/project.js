require = function t(e, c, n) {
function i(o, r) {
if (!c[o]) {
if (!e[o]) {
var a = "function" == typeof require && require;
if (!r && a) return a(o, !0);
if (s) return s(o, !0);
var u = new Error("Cannot find module '" + o + "'");
throw u.code = "MODULE_NOT_FOUND", u;
}
var p = c[o] = {
exports: {}
};
e[o][0].call(p.exports, function(t) {
var c = e[o][1][t];
return i(c || t);
}, p, p.exports, t, e, c, n);
}
return c[o].exports;
}
for (var s = "function" == typeof require && require, o = 0; o < n.length; o++) i(n[o]);
return i;
}({
ButtonScript: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "1d3cfwQw2pA+6Ql+RTCTh9c", "ButtonScript");
cc.Class({
extends: cc.Component,
properties: {
showLabel: cc.Label,
sendButton: cc.Button,
getString: cc.String
},
onBttonClick: function() {
this.getString = "Hello Game";
this.showLabel.string = this.getString;
this.window.webkit.messageHandlers.ocCallJs.postMessage(this.getString);
},
onLoad: function() {},
start: function() {}
});
cc._RF.pop();
}, {} ],
Game: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "ff471qltMxI8aXx3eEGv0ye", "Game");
cc.Class({
extends: cc.Component,
properties: {
starPrefab: {
default: null,
type: cc.Prefab
},
maxStarDuration: 0,
minStarDuration: 0,
ground: {
default: null,
type: cc.Node
},
player: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.groundY = this.ground.y + this.ground.height / 2;
this.spawnNewStar();
},
spawnNewStar: function() {
var t = cc.instantiate(this.starPrefab);
this.node.addChild(t);
t.setPosition(this.getNewStarPosition());
},
getNewStarPosition: function() {
var t = 0, e = this.groundY + cc.random0To1() * this.player.getComponent("Player").jumpHeight + 50, c = this.node.width / 2;
t = cc.randomMinus1To1() * c;
return cc.p(t, e);
},
start: function() {}
});
cc._RF.pop();
}, {} ],
Player: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "c5848KZsWhFq7eNu52W4B2C", "Player");
cc.Class({
extends: cc.Component,
properties: {
jumpHeight: 0,
jumpDuration: 0,
maxMoveSpeed: 0,
accel: 0
},
setJumpAction: function() {
var t = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut()), e = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
return cc.repeatForever(cc.sequence(t, e));
},
setInputControl: function() {
var t = this;
cc.eventManager.addListener({
event: cc.EventListener.KEYBOARD,
onKeyPressed: function(e, c) {
switch (e) {
case cc.KEY.a:
t.accLeft = !0;
t.accRight = !1;
break;

case cc.KEY.d:
t.accLeft = !1;
t.accRight = !0;
}
},
onKeyReleased: function(e, c) {
switch (e) {
case cc.KEY.a:
t.accLeft = !1;
break;

case cc.KEY.d:
t.accRight = !1;
}
}
}, t.node);
},
onLoad: function() {
this.jumpAction = this.setJumpAction();
this.node.runAction(this.jumpAction);
this.accLeft = !1;
this.accRight = !1;
this.xSpeed = 0;
this.setInputControl();
},
start: function() {},
update: function(t) {
this.accLeft ? this.xSpeed -= this.accel * t : this.accRight && (this.xSpeed += this.accel * t);
Math.abs(this.xSpeed) > this.maxMoveSpeed && (this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed));
this.node.x += this.xSpeed * t;
}
});
cc._RF.pop();
}, {} ],
Star: [ function(t, e, c) {
"use strict";
cc._RF.push(e, "e9cd5YTKaFHsLaLgCvw9bAm", "Star");
cc.Class({
extends: cc.Component,
properties: {
pickRadius: 0
},
start: function() {}
});
cc._RF.pop();
}, {} ]
}, {}, [ "ButtonScript", "Game", "Player", "Star" ]);