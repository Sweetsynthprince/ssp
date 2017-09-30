/*
	Animated waves based off codepen by jaromvogel
	https://codepen.io/jaromvogel/pen/jWjWqN
*/

var x = 0;
var offset = 0;
var frequency = 0.15;
var amplitude = .05;
var framerate = 60;
var increment = 1;
var waveElems = document.querySelectorAll('.sine-wave');
var separation = 10;
var wavelength = window.innerWidth;
var scrollInit = false;
var runAnimation = true;
var symbolsTop;
var	redSymbol;
var	whiteSymbol;
var	blueSymbol;

requestAnimationFrame(animate);

function pathFunction(val) {
	return (Math.sin(Math.sqrt(val*frequency)-offset))*val*(0.1 * amplitude);
};

function createGraph(wave, idx) {
	x = 0;
	y = (idx*separation);
	var data = [
		{
			'type': 'M',
			'values': [0,y]
		}
	];
	while (x < wavelength) {
		point = {
			x: x,
			y: y - pathFunction(x) 
		};
		data.push({
			'type': 'L',
			'values': [
				point.x,
				point.y
			]
		});
		x += 5;
	}
	wave.setPathData(data);
};
	
function animate() {
	if(runAnimation) {
		offset += (increment / framerate);
		for(i=0; i<waveElems.length; i++) {
			createGraph(waveElems[i], i);
		}
		requestAnimationFrame(animate);	
	}
}

window.onscroll = function() {
	var scrollY = window.scrollY;
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	if(!symbolsTop) symbolsTop = document.getElementById('symbols').offsetTop;

	if(scrollY<370) {
		amplitude = Math.max(scrollY/200, 0.05);
		separation = Math.max(window.scrollY/10, 10);
	}

	if(scrollY > (windowHeight*1.5) && runAnimation) {
		runAnimation = false;
	} else if(scrollY <= (windowHeight*2) && !runAnimation){
		runAnimation = true;
		requestAnimationFrame(animate);
	}

	// if(scrollY > (symbolsTop-windowHeight) && scrollY < (symbolsTop+windowHeight)) {
	// 	var divisor = windowHeight*0.05;
	// 	var shift = Math.max( (scrollY-(symbolsTop-windowHeight))/divisor, .1);
	// 	redSymbol.style.left = 'calc(50% - '+(40-shift)+'px)';
	// 	// whiteSymbol.style.left = 'calc(50% - '+(35-shift)+'px)';
	// 	blueSymbol.style.left = 'calc(50% - '+(30+shift)+'px)';
	// 	// shift+(windowWidth*0.02);
	// 	// shift+(windowWidth*0.04); 
	// }

};

window.onresize = function() {
	switch(true) {
		case window.innerWidth <= 500:
			wavelength = 500;
			break;
		case window.innerWidth > 500 && window.innerWidth <= 1000:
			wavelength = 1000;
			break;
		case window.innerWidth > 1000 && window.innerWidth <= 1500:
			wavelength = 1500;
			break;
		case window.innerWidth > 1500:
			wavelength = 2000;
			break;
		default:
			wavelength = window.innerWidth;
	}
}

document.getElementById('play-pills').onclick = function() {
	document.getElementById('pills-vid').src += '&autoplay=1';
};

document.addEventListener('DOMContentLoaded', function () {
	var wallopEl = document.querySelector('.Wallop');
	var wallop = new Wallop(wallopEl);
	redSymbol = document.querySelector('.symbol-item--red');
	whiteSymbol = document.querySelector('.symbol-item--white');
	blueSymbol = document.querySelector('.symbol-item--blue');

	setInterval(function() {
		wallop.next();
	}, 5000);
});