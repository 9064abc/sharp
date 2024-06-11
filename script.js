/*var file = new FileReader(); 
file.readAsText(sample.sharp);
var ptag = document.getElementById("context");
ptag.textcontent = file.result;*/
var ptag = document.getElementById("context");
var file_url = "sample.sharp";
var TXT
fetch(file_url).then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
}).then((text) => {
    //text = text.replace(/\n/g,"<br>")
    ptag.textContent = text;
    TXT = text;
}).catch((error) => {
    ptag.textContent = `Could not fetch verse: ${error}`;
});
var s = {};
class Node{
    node_type;
    children = [];
    constructor(node_type,children){
        this.node_type = node_type;
        this.children =children;
    }
};
class Type{
    tag_name;
    attribute;
    text;
    constructor(tag_name,attr,text){
        this.tag_name = tag_name;
        //this.attribute = attr;
        this.text = text;
    }
};
//text = ptag.textContent;
var l = TXT.length
var S,T,attr;
function tagAttr(i){
    while(TXT[i] != ">"){
        S += TXT[i];
        i+=1;
    }
    var l = S.length
    var j = 0
    while(S[j]!="{" && j<l){
        T += S[j];
        j += 1;
    }
    j += 1
    while(S[j]!="}" && j<l){
        attr += S[j]
        j += 1;
    }
    console.log("text  "+T);
    console.log("attr  "+attr);
    return i+1
}
while(i < l){
    if(TXT[i] == "<"){
        /*i+=1;
        while(TXT[i] != ">"){
            S += TXT[i];
            i+=1;
        }*/
        i = tagAttr(i+1);
    } 
}
