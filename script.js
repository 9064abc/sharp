/*var file = new FileReader(); 
file.readAsText(sample.sharp);
var ptag = document.getElementById("context");
ptag.textcontent = file.result;*/
var ptag = document.getElementById("context");
var file_url = "sample.sharp";
fetch(file_url).then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
}).then((text) => {
    //text = text.replace(/\n/g,"<br>")
    ptag.textContent = text;
}).catch((error) => {
    ptag.textContent = `Could not fetch verse: ${error}`;
});
var s = [];
class Node = {
    node_type;
    children;
    constructor(node_type,children){
        this.node_type = node_type;
        this.children =children;
    }
};
class Type = {
    tag_name;
    attribute;
    text;
    consrructor(tag_name,attr,text){
        this.tag_name = tag_name;
        this.attribute = attr;
        this.text = text;
    }
};
