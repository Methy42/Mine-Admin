// var ipcRenderer=require('electron').ipcRenderer;
window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
window.onload = function(){
	document.getElementById("side_btn").onclick = function(){
		sidebar_toggle()
	};
	canvas_auto_width();	
	document.getElementById("welcome_btn").onclick();
}

function sidebar_toggle(){
	var main = document.getElementsByTagName("main")[0];
	if(main.className == "active"){
		main.className = "";
	}else{
		main.className = "active";
	}
}

function test_imp_chart(){
	var canvas = document.getElementById("test-canvas");

	var imp = new $$$imp(canvas,{
		"type":"pie",
		
		"items": [
			{
				"radius": 100,
				"center": {
					"x": 110,
					"y": 110
				},
				"color": "#fff",
				"value": 0.23
			},{
				"radius": 100,
				"center": {
					"x": 110,
					"y": 110
				},
				"color": "#f00",
				"value": 0.18
			},{
				"radius": 100,
				"center": {
					"x": 110,
					"y": 110
				},
				"color": "#0ff",
				"value": 0.26
			},{
				"radius": 100,
				"center": {
					"x": 110,
					"y": 110
				},
				"color": "#ff0",
				"value": 0.33
			}
		]
	});
}

function test_mic(){
	var audio = document.getElementById('audio');
    audio.crossOrigin = 'anonymous';
    audio.src = "../music/test.mp3";
    var ctx = new AudioContext();
    var analyser = ctx.createAnalyser();
    var audioSrc = ctx.createMediaElementSource(audio);
    // we have to connect the MediaElementSource with the analyser 
    audioSrc.connect(analyser);
    analyser.connect(ctx.destination);
    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
    analyser.fftSize = 8192;
    // frequencyBinCount tells you how many values you'll receive from the analyser
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // we're ready to receive some data!
    var canvas = document.getElementById('canvas'),
        cwidth = canvas.width,
        cheight = canvas.height - 2,
        meterWidth = 10, //width of the meters in the spectrum
        gap = 2, //gap between meters
        capHeight = 2,
        capStyle = '#fff',
        meterNum = 800 / (10 + 2), //count of the meters
        // meterNum = 800 ,
        capYPositionArray = []; ////store the vertical position of hte caps for the preivous frame
    ctx = canvas.getContext('2d'),
    gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(1, '#fff');
    gradient.addColorStop(0.5, '#fff');
    gradient.addColorStop(0, '#fff');
    // loop
    function renderFrame() {
        var array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var step = Math.round(array.length / meterNum); //sample limited data from the total array
        ctx.clearRect(0, 0, cwidth, cheight);

        for (var i = 0; i < meterNum; i++) {
            var value = array[i * step];
            if (capYPositionArray.length < Math.round(meterNum)) {
                capYPositionArray.push(value);
            };
            ctx.fillStyle = capStyle;
            //draw the cap, with transition effect
            if (value < capYPositionArray[i]) {
                ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
            } else {
                ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
                capYPositionArray[i] = value;
            };
            ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look
            ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter
        }
        requestAnimationFrame(renderFrame);
    }
    renderFrame();
    audio.play();
}

function canvas_auto_width(){
	var canvases = document.getElementsByClassName("auto-canvas");
	for(var c = 0 ; c < canvases.length ; c++){
		var parent = canvases[c].parentNode;
		var auto_width = parent.offsetWidth;
		canvases[c].width = auto_width/2;
	}
}

function panel_close(obj){
	
	obj.parentNode.parentNode.removeChild(obj.parentNode);
}