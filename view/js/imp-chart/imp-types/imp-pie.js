(function(){
	$$$imp.prototype.imp_cre_pie = function(ctx,opt,canvas){
		
		var begin_radian = 0;
		
		var items = opt.items;

		rendering();

		begin_radian = 0;

		var active_i = null;

		canvas.onmousemove = function(e){
			rendering(function(_ctx,i){
				if(_ctx.isPointInPath(e.offsetX, e.offsetY)){
					console.log(i)
					active_i = i;
					canvas.style.cursor = "pointer";
					//rendering(i)
				}else{
					// active_i = null;
					canvas.style.cursor = "auto";
				}
			});
		}

		function rendering(callBack){
			ctx.clearRect(0,0,canvas.width,canvas.height);  
			for(i in items){
				var item = items[i];
				var _ctx = null;
				if(active_i == i){
					_ctx = test2(item);
				}else{
					_ctx = test(item)
				}
				if(typeof callBack == "function")
					callBack(_ctx,i);
			}
			begin_radian = 0;
		}

		function test(item){
			var r = item.radius;
			var D = 20;
			var value = item.value;
			var radian = 2*Math.PI*value + begin_radian;

			var center = {
				"x":item.center.x,
				"y":item.center.y
			}
			ctx.fillStyle = item.color;
			ctx.shadowBlur=0;
			ctx.shadowColor="black";
			ctx.beginPath();
			ctx.moveTo(center.x,center.y);
			ctx.arc(center.x,center.y,r,begin_radian,radian);
			ctx.lineTo(center.x,center.y);
			
			// ctx.stroke();
			ctx.fill();
			begin_radian = radian;
			return ctx;
		}

		function test2(item){
			var r = item.radius
			var D = 20;
			var value = item.value;
			var radian = 2*Math.PI*value + begin_radian;
			var a = 360-(360*value/2 + begin_radian/(2*Math.PI/360));
			var h = a*(Math.PI/180)

			x_offset = D*Math.cos(h);
			y_offset = D*Math.sin(h);

			// if(90<a<180 || 270<a<360){
			// 	x_offset = 0-x_offset;
			// 	y_offset = 0-y_offset;
			// }
			// if(180<a<270 || 0<a<90){
			// 	x_offset = 0-x_offset;
			// 	y_offset = 0-y_offset;
			// }
			// if(270<a<360 || 180<a<270){
			// 	x_offset = -x_offset;
			// }

			var center = {
				"x":item.center.x + x_offset,
				"y":item.center.y - y_offset
			}
			ctx.fillStyle = item.color;
			ctx.shadowBlur=20;
			ctx.shadowColor="black";
			ctx.beginPath();
			ctx.moveTo(center.x,center.y);
			ctx.arc(center.x,center.y,r,begin_radian,radian);
			ctx.lineTo(center.x,center.y);
			
			// ctx.stroke();
			ctx.fill();
			begin_radian = radian;
			return ctx;
		}
	}
})()
