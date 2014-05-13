var seconds_left = 60;
onmessage = function(){
while (seconds_left >= 0){
    this.postMessage({'seconds_left': seconds_left});
    seconds_left--;
    sleep(1000);
}

function sleep(miliseconds){
    var start = new Date().getTime();
    while((new Date().getTime() - start) < miliseconds){
        ;
    }
}
}
	