var file = new FileReader(); 
file.readAsText(sample.sharp);
var ptag = document.getElementById("context");
ptag.textcontent = file.result;
