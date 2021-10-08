var apiUrl = "API-URL-GOES-HERE"

var imageLoader = document.getElementById('imageLoader');
var imageCanvas = document.getElementById('imageCanvas');
var spinner     = document.getElementById("spinner");
var banner      = document.getElementById("banner");
var bannerText  = document.getElementById("banner-text");
var samples     = document.getElementById("samples");

var context = imageCanvas.getContext('2d');
var image = new Image();

image.onloadeddata = function(e){
    console.log("here" + e)
}

imageLoader.onchange = function(e) {
    loadImage(
        e.target.files[0],
        function(img) {
            console.log(img);
            context.drawImage(img, 0, 0, 256, 256);
            sendImg();
            window.scrollTo(0,0);
        },
        {
            aspectRatio: 1,
            orientation: true,
            canvas: true
        }
    );
};

function loadSample(s){

    let sampleImage = new Image();

    sampleImage.onload = function(){
        console.log('sampleImage Loaded');
        context.drawImage(sampleImage, 0, 0, 256, 256);
        sendImg();
        window.scrollTo(0,0);
    }

    sampleImage.src = s;

}

// function loadSample(s){
//     new Promise(function(resolve, reject) {

//         setTimeout(() => resolve(1), 0);
      
//       }).then(function(result) { // (**)
      
//         image.src = s;
//         return;
      
//       }).then(function(result) { // (**)
      
//         window.scrollTo(0,0);
//         setTimeout(() => sendImg(), 2000);
//         return;
      
//       });
// }

function sendImg(){
    console.log("sendImg")
    spinner.hidden = false;
    banner.hidden = true;
    imgData = imageCanvas.toDataURL("image/png");
    $.ajax({
        type: "POST",
        url: apiUrl,
        data: imgData.substr(22),
        contentType: "application/json",
        success: function(data){
            displayResponse(data);
        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });
}

function argMax(array) {
    return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

function displayResponse(data){

    var bricks = ['Tree', 'Hot Dog', 'Tea'];

    console.log(data);
    maxIndex = -1;
    maxValue = null;
    var i;
    for (i = 0; i < data.length; i++) {
        if (parseFloat(data[i]) > maxValue){
            maxValue = parseFloat(data[i]);
            maxIndex = i;
        }
    } 

    console.log(bricks[maxIndex]);
    bannerText.innerText = bricks[maxIndex];
    spinner.hidden = true;
    banner.hidden = false;

}

image.onload = function(){
    context.drawImage(image, 0, 0, 256, 256);
}

// image.src = 'back.png';

spinner.hidden = true;
banner.hidden = false;
