// 创建日期：2017-8-15 12:56:50
// 创建人：唐华宇
// 说明：
// 		这个文件主要作用是做一个渲染循环对象的兼容，以及定义一个本插件专用的渲染循环对象(为了保留浏览器本身的渲染循环对象，以便与其他带有循环渲染的插件兼容)

var $$$imp_RL = {};

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        $$$imp_RL.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        $$$imp_RL.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!$$$imp_RL.requestAnimationFrame) {
        $$$imp_RL.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!$$$imp_RL.cancelAnimationFrame) {
        $$$imp_RL.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());