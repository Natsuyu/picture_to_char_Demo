Object.prototype.$ = function $(x){
	var that = this==window?document:this;
	return Array.prototype.slice.call(that.querySelectorAll(x));
}
var file = $("#getfile")[0],
	canvas = $("#canvas")[0],
	show = $("#show")[0];
var url,
	image,
	ctx,
	cmp = [],
	charmap = ['#', 'w', '#', '$', 'k', 'd', 't', 'j', 'i', '.', '&nbsp;'];
function getFile(){
	if(window.FileReader){
		var f = new FileReader();
		f.onload = function(e){
			image = new Image();
			url = e.target.result;
			image.src = url;
			init();
		}
		f.readAsDataURL(file.files[0]);
	}
	else {
		console.log("Not support");
	}
}
function init(){
	ctx = canvas.getContext("2d");
	var width = image.width,
		height = image.height;
	canvas.width = width, canvas.height = height;
	ctx.drawImage(image,0,0,width,height);
	var imgdata = ctx.getImageData(0,0,width,height),
		data = imgdata.data,
		ret = "";
	for(var i=0;i<height;i++)
	{
		for(var j=0;j<width;j++)
		{
			var index = (i*width+j)*4;
			var r = data[index],
				g = data[index+1],
				b = data[index+2],
				a = data[index+3];
			var gray =  parseInt(0.2126*r + 0.7152*g + 0.0722*b);
			ret+=get_char(gray, a);
		}
		ret+="<br>";
	}
	
	console.log(imgdata.data.length);

	show.innerHTML= ret;
}
function get_char(x,y){
	if(y==0) return "&nbsp;";
	var length = charmap.length,
		unit = (257)/length;
	if(parseInt(x/unit)>255) console.log(parseInt(x/unit));
	return charmap[parseInt(x/unit)];
}

file.onchange = getFile;
