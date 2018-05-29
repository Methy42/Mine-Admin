function $$$imp(canvas,opt){
	if(!opt){
		throw_error("opt不可用");
		return;
	}if(!opt.type){
		throw_error("opt.type不可用")
	}

	var width = canvas.parentNode.offsetWidth;
	canvas.width = width;
	var ctx = canvas.getContext("2d");
	var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                        ctx.mozBackingStorePixelRatio ||
                        ctx.msBackingStorePixelRatio ||
                        ctx.oBackingStorePixelRatio ||
                        ctx.backingStorePixelRatio || 1;
    var ratio = devicePixelRatio / backingStoreRatio;
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height* ratio;
    ctx.scale(ratio, ratio);
    ctx.translate(0.5, 0.5);

	function throw_error(message){
		console.log("[imp]: " + message);
		console.trace();
	}

	function controller(ftn){
		try{
			ftn(ctx,opt,canvas);
		}catch(e){
			throw_error("未找到对应方法\"" + ftn + "\"")
		}
	}
	

	if(opt.type == "pie"){
		controller(this.imp_cre_pie);
	}

}