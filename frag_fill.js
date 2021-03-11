//a rectangle to draw on
class FragFill{
	constructor(w, h, shader_ind){
		this.p_fpv = 2;
		this.w = w;
		this.h = h;
		this.sh = shader_ind;
		let points = [[-w/2,-h/2],[w/2,-h/2],[-w/2,h/2],[w/2,h/2]];
		this.pos_buffer = new Float32Array(this.p_fpv*points.length);
		this.fsize = this.pos_buffer.BYTES_PER_ELEMENT;

		let buf_ind = 0;
		for(let i = 0; i < 4; i++){
			for(let j = 0; j < 2; j++, buf_ind++){
				this.pos_buffer[buf_ind] = points[i][j];
			}
		}

		switch_shader(this.sh);
		this.gl_pos_buf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.gl_pos_buf);
		gl.bufferData(gl.ARRAY_BUFFER, this.pos_buffer, gl.STATIC_DRAW);

		this.a_Position = gl.getAttribLocation(gl.program, 'a_Position');
		gl.vertexAttribPointer(this.a_Position, this.p_fpv, gl.FLOAT, false, this.fsize*this.p_fpv, 0);
		gl.enableVertexAttribArray(this.a_Position);

		this.u_ScreenSize = gl.getUniformLocation(gl.program, 'u_ScreenSize');
		gl.uniform2f(this.u_ScreenSize, w, h);
	}

	draw(){
		switch_shader(this.sh);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.gl_pos_buf);
		gl.vertexAttribPointer(this.a_Position, this.p_fpv, gl.FLOAT, false, this.fsize*this.p_fpv, 0);


		gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.pos_buffer.length/this.p_fpv);
	}
}