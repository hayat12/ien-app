(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{YYXU:function(t,e,o){"use strict";o.r(e),o.d(e,"IonToast",function(){return p}),o.d(e,"IonToastController",function(){return u});var n=o("B5Ai"),i=o("cBjU"),a=o("6Fnk"),r=o("ATF1");function s(t,e,o){var n=new t,i=new t,a=e.host||e,r=e.querySelector(".toast-wrapper");switch(i.addElement(r),o){case"top":i.fromTo("translateY","-100%","calc(10px + var(--ion-safe-area-top, 0px))");break;case"middle":var s=Math.floor(a.clientHeight/2-r.clientHeight/2);r.style.top=s+"px",i.fromTo("opacity",.01,1);break;default:i.fromTo("translateY","100%","calc(-10px - var(--ion-safe-area-bottom, 0px))")}return Promise.resolve(n.addElement(a).easing("cubic-bezier(.155,1.105,.295,1.12)").duration(400).add(i))}function c(t,e,o){var n=new t,i=new t,a=e.host||e,r=e.querySelector(".toast-wrapper");switch(i.addElement(r),o){case"top":i.fromTo("translateY","calc(10px + var(--ion-safe-area-top, 0px))","-100%");break;case"middle":i.fromTo("opacity",.99,0);break;default:i.fromTo("translateY","calc(-10px - var(--ion-safe-area-bottom, 0px))","100%")}return Promise.resolve(n.addElement(a).easing("cubic-bezier(.36,.66,.04,1)").duration(300).add(i))}function l(t,e,o){var n=new t,i=new t,a=e.host||e,r=e.querySelector(".toast-wrapper");switch(i.addElement(r),o){case"top":r.style.top="calc(8px + var(--ion-safe-area-top, 0px))",i.fromTo("opacity",.01,1);break;case"middle":var s=Math.floor(a.clientHeight/2-r.clientHeight/2);r.style.top=s+"px",i.fromTo("opacity",.01,1);break;default:r.style.bottom="calc(8px + var(--ion-safe-area-bottom, 0px))",i.fromTo("opacity",.01,1)}return Promise.resolve(n.addElement(a).easing("cubic-bezier(.36,.66,.04,1)").duration(400).add(i))}function d(t,e){var o=new t,n=new t,i=e.host||e,a=e.querySelector(".toast-wrapper");return n.addElement(a),n.fromTo("opacity",.99,0),Promise.resolve(o.addElement(i).easing("cubic-bezier(.36,.66,.04,1)").duration(300).add(n))}var p=function(){function t(){this.presented=!1,this.duration=0,this.keyboardClose=!1,this.position="bottom",this.showCloseButton=!1,this.translucent=!1,this.animated=!0}return t.prototype.componentDidLoad=function(){this.ionToastDidLoad.emit()},t.prototype.componentDidUnload=function(){this.ionToastDidUnload.emit()},t.prototype.present=function(){return n.a(this,void 0,void 0,function(){var t=this;return n.c(this,function(e){switch(e.label){case 0:return[4,Object(a.e)(this,"toastEnter",s,l,this.position)];case 1:return e.sent(),this.duration>0&&(this.durationTimeout=setTimeout(function(){return t.dismiss(void 0,"timeout")},this.duration)),[2]}})})},t.prototype.dismiss=function(t,e){return this.durationTimeout&&clearTimeout(this.durationTimeout),Object(a.b)(this,t,e,"toastLeave",c,d,this.position)},t.prototype.onDidDismiss=function(){return Object(a.c)(this.el,"ionToastDidDismiss")},t.prototype.onWillDismiss=function(){return Object(a.c)(this.el,"ionToastWillDismiss")},t.prototype.hostData=function(){return{style:{zIndex:6e4+this.overlayIndex},class:Object.assign({},Object(r.h)(this.color),Object(r.g)(this.cssClass),{"toast-translucent":this.translucent})}},t.prototype.render=function(){var t,e=this,o=((t={"toast-wrapper":!0})["toast-"+this.position]=!0,t);return Object(i.b)("div",{class:o},Object(i.b)("div",{class:"toast-container"},void 0!==this.message&&Object(i.b)("div",{class:"toast-message"},this.message),this.showCloseButton&&Object(i.b)("ion-button",{fill:"clear","ion-activatable":!0,class:"toast-button",onClick:function(){return e.dismiss(void 0,"cancel")}},this.closeButtonText||"Close")))},Object.defineProperty(t,"is",{get:function(){return"ion-toast"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{animated:{type:Boolean,attr:"animated"},animationCtrl:{connect:"ion-animation-controller"},closeButtonText:{type:String,attr:"close-button-text"},color:{type:String,attr:"color"},config:{context:"config"},cssClass:{type:String,attr:"css-class"},dismiss:{method:!0},duration:{type:Number,attr:"duration"},el:{elementRef:!0},enterAnimation:{type:"Any",attr:"enter-animation"},keyboardClose:{type:Boolean,attr:"keyboard-close"},leaveAnimation:{type:"Any",attr:"leave-animation"},message:{type:String,attr:"message"},mode:{type:String,attr:"mode"},onDidDismiss:{method:!0},onWillDismiss:{method:!0},overlayIndex:{type:Number,attr:"overlay-index"},position:{type:String,attr:"position"},present:{method:!0},showCloseButton:{type:Boolean,attr:"show-close-button"},translucent:{type:Boolean,attr:"translucent"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"ionToastDidLoad",method:"ionToastDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionToastDidPresent",method:"didPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionToastWillPresent",method:"willPresent",bubbles:!0,cancelable:!0,composed:!0},{name:"ionToastWillDismiss",method:"willDismiss",bubbles:!0,cancelable:!0,composed:!0},{name:"ionToastDidDismiss",method:"didDismiss",bubbles:!0,cancelable:!0,composed:!0},{name:"ionToastDidUnload",method:"ionToastDidUnload",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return":host{--button-color:inherit;left:0;top:0;display:block;position:absolute;width:100%;height:100%;color:var(--color);font-family:var(--ion-font-family,inherit);contain:strict;z-index:1000;pointer-events:none}:host(.ion-color){--color:var(--ion-color-contrast);--background:var(--ion-color-base);--button-color:inherit}.toast-wrapper{background:var(--background)}.toast-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;pointer-events:auto;contain:content}.toast-button{color:var(--button-color)}.toast-message{-ms-flex:1;flex:1;white-space:pre-wrap}:host{--button-color:var(--ion-color-primary,#3880ff);--background:var(--ion-text-color-step-200,#333);--color:var(--ion-background-color-step-50,#f2f2f2);font-size:14px}.toast-wrapper{border-radius:4px;left:8px;right:8px;margin:auto;display:block;position:absolute;max-width:700px;-webkit-box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);opacity:.01;z-index:10}.toast-message{padding:14px 16px;line-height:20px}.toast-button{--margin-end:0}"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"styleMode",{get:function(){return"md"},enumerable:!0,configurable:!0}),t}(),u=function(){function t(){}return t.prototype.create=function(t){return Object(a.f)(this.doc.createElement("ion-toast"),t)},t.prototype.dismiss=function(t,e,o){return Object(a.g)(this.doc,t,e,"ion-toast",o)},t.prototype.getTop=function(){return n.a(this,void 0,void 0,function(){return n.c(this,function(t){return[2,Object(a.h)(this.doc,"ion-toast")]})})},Object.defineProperty(t,"is",{get:function(){return"ion-toast-controller"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{create:{method:!0},dismiss:{method:!0},doc:{context:"document"},getTop:{method:!0}}},enumerable:!0,configurable:!0}),t}()}}]);