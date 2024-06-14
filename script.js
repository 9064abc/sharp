/*var file = new FileReader(); 
file.readAsText(sample.sharp);
var ptag = document.getElementById("context");
ptag.textcontent = file.result;*/
var ptag = document.getElementById("context");
var file_url = "sample.sharp";
var TXT;
var ln = -1;
var l;
fetch(file_url).then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
}).then((text) => {
    //text = text.replace(/\n/g,"<br>")
    ptag.textContent = text;
    TXT = text;
    ln = TXT.length;
    perse();
}).catch((error) => {
    ptag.textContent = `Could not fetch verse: ${error}`;
});
var s = {};
class Node{
    node_type;
    children = [];
    constructor(node_type,children){
        this.node_type = node_type;
        //this.children.push(children);
    }
    Nchild(child){
        this.children.push(child);
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
function perse_text(i){
    var j = i;
    var S = "";
    while(TXT[j] != "#"){
        if(TXT[j] == "<"){
            j = tagAttr(j+1);
        }else{
            S += TXT[j];
            j += 1
        }
    }
    console.log("text  "+S);
    return j+1;
}

function tagAttr(i){
    var S = "";
    var T = "";
    var attr = "";
    var j = 0
    while(TXT[i] != ">"){
        S += TXT[i];
        i+=1;
    }
    l = S.length
    
    while(S[j]!="{" && j<l){
        T += S[j];
        j += 1;
    }
    j += 1
    while(S[j]!="}" && j<l){
        attr += S[j]
        j += 1;
    }
    console.log("tag_name  "+T);
    console.log("attr  "+attr);
    return i+1
}
function perse(){
    i=0
    var type = new Type("sharp","","parent");
    var dom = new Node(type,0);
    console.log(dom);
    while(i < ln){
        if(TXT[i] == "<"){
            /*i+=1;
            while(TXT[i] != ">"){
                S += TXT[i];
                i+=1;
            }*/
            i = tagAttr(i+1);
        }else if(TXT[i] =="#"){
            i += 1
            i = perse_text(i);
        }else{
            i += 1;
        } 
    }
}
