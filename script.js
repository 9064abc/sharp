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
    ptag.textContent = text;
}).catch((error) => {
    ptag.textContent = `Could not fetch verse: ${error}`;
});
var s = [];
