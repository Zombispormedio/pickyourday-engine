var fs = require('fs');

var array = fs.readFileSync('cubo.obj').toString().split("\n");

var vertex = array.filter(function(a){
	return a[0]=='v';
	

});

var obj = {
	v:[],
	vn:[],
	vt:[]
};

vertex.forEach(function(a){
	var elements = a.replace("\r", "").split(" ");
	var key=elements[0];	
	
	obj[key]=obj[key].concat(elements.slice(1).filter(function(a){
		return a!="";
	}));

});

fs.writeFile("cubo.json",JSON.stringify(obj));

