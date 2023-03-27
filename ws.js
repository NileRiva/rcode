const servos = ["s1slider","s2slider","s3slider","s4slider","s5slider","s6slider"];
const servoangles = ["s1angle","s2angle","s3angle","s4angle","s5angle","s6angle"];
let slider = new Array();
let output = new Array();





var ws = new WebSocket("ws://localhost:8000/gobot")
ws.onmessage = event => {
    var number = document.getElementById("number")
    number.innerHTML = event.data
}
handleOnClick = () => {
    ws.send("hi")
}

for(let i=0; i<servos.length;i++)
{
    slider[i] = document.getElementById(servos[i]);
    output[i] = document.getElementById(servoangles[i]);
    output[i].innerHTML = slider[i].value;

    slider[i].oninput = function() {
    output[i].innerHTML = this.value;
    ws.send(i);
    ws.send(this.value);
    }
}

var sendCommand = 1;
            
            //Key Pressed
            document.addEventListener("keydown", function (evt) {
                if (evt.keyCode == "38" && sendCommand) {   // up arrow
                    ws.send("FF000100FF") 
                    sendCommand = 0;
                }
                else if (evt.keyCode == "40" && sendCommand) {  // down arrow
                    ws.send("FF000200FF") 
                    sendCommand = 0;
                }
                else if (evt.keyCode == "37" && sendCommand) {  // left arrow
                    ws.send("FF000300FF") 
                    sendCommand = 0;
                }
                else if (evt.keyCode == "39" && sendCommand) {  // right arrow
                    ws.send("FF000400FF")
                    sendCommand = 0;
                }
                else if (evt.keyCode == "13" && sendCommand) {  // Enter
                    ws.send("FF130000FF")
                    sendCommand = 0;
                }
                else if (evt.keyCode == "38" && evt.keyCode == "37" && sendCommand) {  // Forward Left right arrow
                    ws.send("FF000500FF")
                    sendCommand = 0;
                }
                else if (evt.keyCode == "38" && evt.keyCode == "39" && sendCommand) {  // Forward right arrow
                    ws.send("FF000700FF")
                    sendCommand = 0;
                }
                else if (evt.keyCode == "40" && evt.keyCode == "37" && sendCommand) {  // Backward Left arrow
                    ws.send("FF000600FF")
                    sendCommand = 0;
                }
                else if (evt.keyCode == "40" && evt.keyCode == "39" && sendCommand) {  // Backward right arrow
                    ws.send("FF000800FF")
                    sendCommand = 0;
                }
            });
            
            //Key Released
            document.addEventListener("keyup", function (evt) {
                if(evt.keyCode == "37" || evt.keyCode == "38" || evt.keyCode == "39" || evt.keyCode == "40") {//STOP
                    ws.send("FF000000FF");
                    sendCommand = 1;
                }
            });