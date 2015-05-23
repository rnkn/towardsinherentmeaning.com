---
#
---
document.addEventListener("DOMContentLoaded", function() {
    var spinner = document.getElementsByClassName("spinner")[0];

    var canvas = document.getElementsByTagName("canvas")[0];
    var context = canvas.getContext("2d");

    var info = document.getElementById("info");

    window.videoArray = [];
    window.videoIndex = 0;

    window.videoArray.push(createVideo("walking.mp4", true, true));
    window.videoArray.push(createVideo("digging.mp4", true, true));

    window.videoArray[window.videoIndex].addEventListener("play", function() {
        spinner.style.display = "none";
        window.setInterval(drawCanvas, 40, canvas, context);
    }, false);

    canvas.addEventListener("click", function() {
        changeVideo();
    }, false);

    canvas.addEventListener("dbclick", function() {
        screenfull.toggle();
    }, false);

    info.addEventListener("click", function() {
        toggleDisplay("info");
    }, false);
}, false);

function createVideo(source, loop, autoplay) {
    var e = document.createElement("video");
    e.src = "{{ site.assets }}" + source;
    e.loop = loop;
    e.autoplay = autoplay;
    return e;
}

function changeVideo() {
    window.videoIndex++;
    if (window.videoIndex == window.videoArray.length) {
        window.videoIndex = 0;
    }
}

function drawCanvas(canvas, context) {
    var video = window.videoArray[window.videoIndex];
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    var sRatio = video.videoWidth / video.videoHeight;
    var dWidth = canvas.width;
    var dHeight = canvas.height;
    var dRatio =  dWidth / dHeight;
    var dX = 0;
    var dY = 0;

    if (dRatio < sRatio) {
        dWidth = dHeight * sRatio;
        dX = 0 - (dWidth - canvas.width) / 2;
    }
    else {
        dHeight = dWidth / sRatio;
        dY = 0 - (dHeight - canvas.height) / 2;
    }

    context.drawImage(video, dX, dY, dWidth, dHeight);
}

function toggleDisplay(id) {
    var e = document.getElementById(id);
    if(e.style.display == "block") {
        e.style.display = "none";
    }
    else {
        e.style.display = "block";
    }
}

Mousetrap.bind("?", function() { toggleDisplay("info"); });
Mousetrap.bind("f", function() { screenfull.toggle(); });
Mousetrap.bind("space", function() { changeVideo(); });
