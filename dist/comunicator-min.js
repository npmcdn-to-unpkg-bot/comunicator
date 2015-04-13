/*
 * comunicator - v0.1.1
 *
 * The 720kb notifier api (atm it uses websockets)
 * 2015-04-13
 */


!function(a){"use strict";var b=function c(b){this.timeWaitSlice=64,this.timeWaitSliceChoices=[0],this.chosenTimeWaitValue=0,this.sendPendingRequests=[],this.joinPendingRequests=[],this.giveMeATimeWait=function(){return Math.floor(Math.random()*(this.timeWaitSliceChoices.length+1))},this.onWebsocketMessage=function(b){var c,d=a.JSON.parse(b.data);if("joined"===d.opcode?c=new a.CustomEvent("comunicator:joined"):"sent"===d.opcode?c=new a.CustomEvent("comunicator:toMe",{detail:d}):"broadcasted"===d.opcode&&(c=new a.CustomEvent("comunicator:toAll",{detail:d})),!c)throw"Operation code from comunicator not reconized";a.dispatchEvent(c)},this.onWebsocketClose=function(){this.whoReallyAmI&&this.reallyToken&&(a.dispatchEvent(new a.CustomEvent("comunicator:closed")),c._doJoin.bind(this))},this.sendMessage=function(b,d){var e,f,g,h=c._onTick.bind(this,this.sendMessage.bind(this,b,d),"send"),i=0;if(this.websocket.readyState===a.WebSocket.OPEN){for(this.websocket.push(JSON.stringify({opcode:b,token:this.reallyToken,data:d})),i=0,f=this.sendPendingRequests.length;f>i;i+=1)g=this.sendPendingRequests[i],a.cancelAnimationFrame(g);this.sendPendingRequests=[]}else a.console.debug("Trasport to server is not ready. Delay sending..."),e=a.requestAnimationFrame(h),this.sendPendingRequests.push(e)},this.initComunicator=function(b){if(!b)throw"Please provide a valid URL.";this.websocket=new a.WebSocket(b),this.websocket.onopen=function(){a.console.info("Trasport",this,"opened.")},this.websocket.push=this.websocket.send,this.websocket.send=this.sendMessage.bind(this),this.websocket.onmessage=this.onWebsocketMessage.bind(this),this.websocket.onclose=this.onWebsocketClose.bind(this)},this.initComunicator(b)};b._onTick=function d(b,c){var e,f;this.chosenTimeWaitValue>0&&this.websocket.readyState!==a.WebSocket.OPEN?(this.chosenTimeWaitValue-=1,a.console.debug("Decreasing chosen time wait value..."),e=a.requestAnimationFrame(d.bind(this,b,c)),"send"===c?this.sendPendingRequests.push(e):this.joinPendingRequests.push(e)):(f=this.timeWaitSlice*(Math.pow(2,this.timeWaitSliceChoices.length)-1),this.timeWaitSliceChoices.push(f),this.chosenTimeWaitValue=this.giveMeATimeWait(),a.console.debug("Chosen time wait value:",this.chosenTimeWaitValue),b())},b._doJoin=function e(){var c,d,f,g=b._onTick.bind(this,e,"join"),h=0;if(this.websocket.readyState===a.WebSocket.OPEN){for(this.websocket.push(JSON.stringify({opcode:"join",whoami:this.whoReallyAmI,token:this.reallyToken})),h=0,d=this.joinPendingRequests.length;d>h;h+=1)f=this.joinPendingRequests[h],a.cancelAnimationFrame(f);this.joinPendingRequests=[]}else this.websocket.readyState===a.WebSocket.CONNECTING?(a.console.info("Trasport to server is not yet ready. Delay joining..."),c=a.requestAnimationFrame(g),this.joinPendingRequests.push(c)):(a.console.info("Trasport to server is down by now. Delay joining..."),this.initComunicator(this.websocket.url),this.websocket.send=this.sendMessage.bind(this),this.websocket.onmessage=this.onWebsocketMessage.bind(this),this.websocket.onclose=this.onWebsocketClose.bind(this),c=a.requestAnimationFrame(g),this.joinPendingRequests.push(c))},b.prototype.promise=function(c){if(!this.websocket)throw"Mandatory field comunicatorServerURL required";if(c&&Array.isArray(c)){var d=function(d){var e,f,g=c.length,h=function(a,c){if(this.whoReallyAmI=a,this.reallyToken=c,!this.whoReallyAmI||!this.reallyToken)throw"User identification datas missing.";b._doJoin.bind(this)},i=function(a){if(!this.whoReallyAmI||!this.websocket)throw"User identification required";var b={whoami:this.whoReallyAmI,who:"*",what:a};this.websocket.send("broadcast",b)},j=function(a,b){if(!this.whoReallyAmI||!this.websocket)throw"User identification required";var c={whoami:this.whoReallyAmI,who:a,what:b};this.websocket.send("sendTo",c)},k=function(){this.websocket.readyState===a.WebSocket.OPEN&&this.websocket.close()},l=function m(){for(e=0;g>e;e+=1)f=c[e],f&&a.removeEventListener(f,m,!1);d({userIsPresent:h,broadcast:i,sendTo:j,exit:k})};for(e=0;g>e;e+=1)f=c[e],f&&a.addEventListener(f,l,!1)};return new Promise(d.bind(this))}throw"events must be defined and must be an array"},a.Comunicator=b}(window),function(a){"use strict";for(var b=0,c=["ms","moz","webkit","o"],d=0;d<c.length&&!a.requestAnimationFrame;d+=1)a.requestAnimationFrame=a[c[d]+"RequestAnimationFrame"],a.cancelAnimationFrame=a[c[d]+"CancelAnimationFrame"]||a[c[d]+"CancelRequestAnimationFrame"];a.requestAnimationFrame||(a.requestAnimationFrame=function(c){var d=(new Date).getTime(),e=Math.max(0,16-(d-b)),f=a.setTimeout(function(){c(d+e)},e);return b=d+e,f}),a.cancelAnimationFrame||(a.cancelAnimationFrame=function(b){a.clearTimeout(b)})}(window);
//# sourceMappingURL=comunicator-min.js.map