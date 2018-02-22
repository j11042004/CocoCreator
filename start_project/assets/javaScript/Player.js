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
        // 主角跳躍高度
        jumpHeight : 0,
        // 主角跳躍時間
        jumpDuration : 0,
        // 最大移動速度
        maxMoveSpeed : 0,
        // 加速度
        accel : 0,

        RightButton : cc.Button,
        LeftButton : cc.Button,

        // 跳躍的音效
        jumpAudio:{
            default : null,
            url: cc.AudioClip
        },
    },

    setJumpAction: function(){
         // 跳躍上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        var callback = cc.callFunc(this.playJumpSound, this);

        // 不斷重複
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },
    // 跳躍時的聲音
    playJumpSound: function(){
        cc.audioEngine.playEffect(this.jumpAudio,false);
    },
    // 控制 Player 移動方向
    setInputControl: function () {
        var self = this;
        // 添加键盘事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // 有按键按下时，判断是否是我们指定的方向控制键，并设置向对应方向加速
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                        self.accLeft = true;
                        self.accRight = false;
                        break;
                    case cc.KEY.d:
                        self.accLeft = false;
                        self.accRight = true;
                        break;
                }
            },
            // 松开按键时，停止向该方向的加速
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                        self.accLeft = false;
                        break;
                    case cc.KEY.d:
                        self.accRight = false;
                        break;
                }
            }
        }, self.node);
    },
    // Button 控制 ， 若要在這新增 Button 事件，就不可在 外面的 Button 設定 Click 事件
    rightButtonAction : function (event) {
       //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 Button 组件
       var button = event.detail;
       console.log('Hello');
       //do whatever you want with button
       //另外，注意这种方式注册的事件，也无法传递 customEventData
    },

    // 重設 onLoad 
    onLoad: function () {
        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;

        // 初始化键盘输入监听
        this.setInputControl();
        // this.RightButton.node.on('click', this.rightButtonAction,this.RightButton);
    },

    start () {

    },
    // 重設 update 
    update: function (dt) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // 限制主角的速度不能超过最大值
        if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
        if (this.node.x <= -441) {
            this.node.x = -441;
        }
        if (this.node.x >= 441) {
            this.node.x = 441;
        }
    },
});
