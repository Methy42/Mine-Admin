(function(){
	var xmlhttp;
	if (window.XMLHttpRequest){
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	}
	else{
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	

	var all_a_tag = document.getElementsByClassName("side_href");
	for(var a = 0 ; a < all_a_tag.length ; a++){
		var href = all_a_tag[a].href;
		if(href != "javascript:;"){
			all_a_tag[a].href = "javascript:;";
			all_a_tag[a].setAttribute("_href",href);
			all_a_tag[a].onclick = function(){
				var content_node = document.getElementsByClassName("content")[0];
				var _href = this.getAttribute("_href");
				var col = this.getAttribute("data-col");
				var page_iframe = document.createElement("iframe");
				page_iframe.src=_href;
				var panel_div = create_panel(page_iframe);
				var col_div = document.createElement("div");
				col_div.className = "col-" + col;
				col_div.appendChild(panel_div);
				content_node.appendChild(col_div);
				page_iframe.onload = function(){
					this.contentDocument.body.style.margin = "0px";
					this.contentDocument.body.style.padding = "1px";
					this.style.height = this.contentDocument.body.offsetHeight + "px";
					var title = this.contentDocument.title;
					this.parentNode.previousSibling.innerHTML = "<span>" + title + 
						"</span><a class='close' href='javascript:;' onclick='panel_close(this.parentNode.parentNode)'>×</a>";
				}
				// var content_node = document.getElementsByClassName("content")[0];
				// xmlhttp.onreadystatechange=function(){
				// 	if (xmlhttp.readyState==4 && xmlhttp.status==200){
				// 		var div=document.createElement("div");
				// 		div.innerHTML = xmlhttp.responseText;
				// 		content_node.appendChild(div);
				// 		var script_arr = split_script(xmlhttp.responseText);
				// 		for(s in script_arr){
				// 			try {
				// 				eval(script_arr[s]) //执行脚本
				// 			} catch (e) {
				// 				console.log(e);
				// 			}
				// 		}
				// 	}
				// }
				// var _href = this.getAttribute("_href");
				// xmlhttp.open("GET",_href,true);
				// xmlhttp.send();
			}
		}
	}

	function create_panel(content){
		var panel_div = document.createElement("div");
		var title_div = document.createElement("div");
		var body_div = document.createElement("div");
		panel_div.className = "panel";
		title_div.className = "title";
		body_div.className = "body";
		body_div.appendChild(content);
		title_div.innerHTML = "<span>加载中</span>";
		panel_div.appendChild(title_div);
		panel_div.appendChild(body_div);
		return panel_div;
	}

	function split_script(str){
		var script_arr = [];
		var _str_arr = str.split("<script type=\"text\/javascript\">");
		for(var s = 1 ; s < _str_arr.length ; s++){
			var script_str = _str_arr[s].split("<\/script>")[0];
			script_arr.push(script_str);
		}
		return script_arr;
	}
})()

