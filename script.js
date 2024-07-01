/*var file = new FileReader(); 
file.readAsText(sample.sharp);
var ptag = document.getElementById("context");
ptag.textcontent = file.result;*/
var ctx = document.getElementById("context");
var file_url = "sample.sharp";
var TXT;
var ln = -1;
var l;
var nodes = [];
function makeP(S){
    var el = document.querySelector("#ptag");
    var p = document.createElement("p");
    p.textContent = S;
    el.appendChild(p);
}
fetch(file_url).then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }
    return response.text();
}).then((text) => {
    //text = text.replace(/\n/g,"<br>")
    ctx.textContent = text;
    TXT = text;
    ln = TXT.length;
    perse();
}).catch((error) => {
    ctx.textContent = `Could not fetch verse: ${error}`;
});
var s = {};
class Node{
    node_type;
    children = [];
    constructor(node_type){
        this.node_type = node_type;
        //this.children.push(children);
    }
    Nchildren(ch){
        for(var child of ch){
            this.children.push(child);
        }
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
function perse_text(i,name,attr){
    var j = i;
    var S = "";
    var r = 0;
    var ch = [];
    while(TXT[j] != "#"){
        if(TXT[j] == "<"){
            r = tagAttr(j+1);
            j = r[0];
            ch.push(r[1]);
        }else{
            S += TXT[j];
            j += 1
        }
    }
    console.log("text  "+S);
    makeP("text  :"+S);
    var type = new Type(name,attr,S);
    //ch = ["head","body"]
    var dom = new Node(type);
    //nodes.push(dom);
    //nodes[nodes.length-1].Nchildren(ch);
    dom.Nchildren(ch);
    return [j+1,dom];
}

function tagAttr(i){
    var S = "";
    var T = "";
    var attr = "";
    var j = 0;
    var r = 0;
    while(TXT[i] != ">"){
        S += TXT[i];
        i+=1;
    }
    l = S.length
    
    while(S[j]!=" " && j<l){
        T += S[j];
        j += 1;
    }
    while(S[j]!="{" && j<l){
        j += 1
    }
    j += 1;
    while(S[j]!="}" && j<l){
        attr += S[j]
        j += 1;
    }
    while(TXT[i] != "#"){
        i += 1;
    }
    console.log("tag_name  "+T);
    makeP("tag_name  :"+T);
    console.log("attr  "+attr);
    makeP("attr  :"+attr);
    i = perse_text(i+1,T,attr);
    r = [i[0]+1,i[1]];
    return r
}
function perse(){
    i=0
    var type = new Type("sharp","","parent");
    //var ch = ["head","body"]
    var ch = [];
    var r
    var dom = new Node(type);
    nodes.push(dom);
    //nodes[nodes.length-1].Nchildren(ch);
    console.log(nodes);
    while(i < ln){
        if(TXT[i] == "<"){
            r = tagAttr(i+1);
            i = r[0];
            ch.push(r[1]);
        }else{
            i += 1;
        } 
    }
    nodes[nodes.length-1].Nchildren(ch);
    console.log(nodes);
}

