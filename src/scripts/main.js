var x = 0;
var offset = 0;
var frequency = 0.25;
var amplitude = 0;
var framerate = 50;
var increment = 5;
var waveElems = document.querySelectorAll('.sine-wave');
var separation = 10;
var wavelength = window.innerWidth;
var scrollInit = false;

requestAnimationFrame(animate);

function pathFunction(val) {
	var result = 
		// Function to determine curve
		// 0.2*(Math.sin(Math.sqrt(x)-$scope.offset))*x;
		(Math.sin(Math.sqrt(val*frequency)-offset))*val*(0.1 * amplitude);
	
	return result;
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
		x += 1;
	}
	wave.setPathData(data);
};
	
	
function animate () {
	offset += (increment / framerate);
	for(i=0; i<waveElems.length; i++) {
		createGraph(waveElems[i], i);
	}
	setTimeout(function () {
		requestAnimationFrame(animate);	
	},(1000 / framerate));
}

// window.onscroll = function() {
// 	if(window.scrollY < 400 && window.scrollY > 10) {
// 		separation = window.scrollY/10;
// 	} else if (window.scrollY <= 10) {
// 		seperation = 0;
// 	}
// };

window.onscroll = function() {
	var sy = window.scrollY;
	
	if(sy<320) {
		amplitude = sy/200;
		separation = Math.max(window.scrollY/10, 10);
	}

	if(sy > 0 && !scrollInit) {
		scrollInit = true;
		[].map.call(document.querySelectorAll('.sine-wave'), function(el) {
			el.classList.add('sine-wave-active');
		});
	}
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