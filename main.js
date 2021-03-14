var mouse = {
	drag: false,
	x: -1,
	y: -1
};

function main(){
	c = document.getElementById('c');
	c.width = window.innerWidth*window.devicePixelRatio;
	c.height = window.innerHeight*window.devicePixelRatio;

	setup_gl();
	frag_fill = new FragFill(c.width, c.height, 0);

	draw();

	c.onmousedown = function(e){
		if(mouse.x == -1){
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		}
		mouse.drag = true;
	}
	c.onmouseup = function(){
		mouse.drag = false;
	}
	c.onmouseleave = function(){
		mouse.drag = false;
	}
	c.onmousemove = function(e){
		if(mouse.drag){
			let fct = .0003;
			let dx = e.clientX - mouse.x;
			let dy = e.clientY - mouse.y;
			frag_fill.move_offset(-fct*dx, fct*dy);
			draw();
		}
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}
	c.onwheel = function(e){
		frag_fill.move_zoom(-.1*e.deltaY);
		draw();
	}
}

function draw(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	frag_fill.draw();
}

document.body.onresize = function(){
	c.width = window.innerWidth*window.devicePixelRatio;
	c.height = window.innerHeight*window.devicePixelRatio;
	if(gl){
		gl.viewport(0, 0, c.width, c.height);
		frag_fill.set_size(c.width, c.height);
		draw();
	}
}