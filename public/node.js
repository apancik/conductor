var worker = new Worker("/program");

function postResults(data) {    
    var request = new XMLHttpRequest();
    request.open("POST", "/results", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
}

function getData() {    
    var request = new XMLHttpRequest();
    request.open("GET", "/data", true);

    request.onload = function () {        
        if (this.status == 200) {
            worker.postMessage(JSON.parse(this.response));
        } else {
            // wait 10 seconds before trying to download the data again
            setTimeout(getData, 10000);
        }
    };

    request.send();
}

worker.addEventListener("message", function (payload) {
    postResults(payload.data);
    getData();
}, false);

getData();