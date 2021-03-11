function main(){
	c = document.getElementById('c');
	c.width = window.innerWidth*window.devicePixelRatio;
	c.height = window.innerHeight*window.devicePixelRatio;

	setup_gl();
	frag_fill = new FragFill(c.width, c.height, 0);

	draw();
}

function draw(){
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	frag_fill.draw();
}