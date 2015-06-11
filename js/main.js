---
#
---
document.addEventListener("DOMContentLoaded", function() {
    window.birth = Date.parse("Wed May 27 14:13:56 2015 +1000");
    window.videoArray = [];
    window.videoIndex = 0;
    var videoReady = 0;
    var videoTotal = 2;

    var spinner = document.getElementsByClassName("spinner")[0];

    var canvas = document.getElementsByTagName("canvas")[0];
    var context = canvas.getContext("2d");

    var info = document.getElementById("info");

    window.videoArray.push(createVideo("walking.mp4", true, false, true));
    window.videoArray.push(createVideo("digging.mp4", true, false, true));

    window.videoArray.forEach(function(e, i, a) {
        e.addEventListener("canplaythrough", function() {
            syncVideo(this);
            videoReady++;
            if (videoReady == videoTotal) {
                spinner.style.display = "none";
                canvas.addEventListener("click", function() {
                    changeVideo();
                }, false);
                canvas.addEventListener("dblclick", function() {
                    screenfull.toggle();
                }, false);
                window.videoArray.forEach(function(e, i, a) {
                    e.play();
                });
                window.setInterval(drawCanvas, 40, canvas, context);
            }
        }, false);
    });

    info.addEventListener("click", function() {
        toggleDisplay("info");
    }, false);
}, false);

function createVideo(source, preload, autoplay, loop) {
    var e = document.createElement("video");
    e.src = "{{ site.assets }}" + source;
    e.preload = preload;
    e.autoplay = autoplay;
    e.loop = loop;
    return e;
}

function changeVideo() {
    window.videoIndex++;
    if (window.videoIndex == window.videoArray.length) {
        window.videoIndex = 0;
    }
}

function syncVideo(video) {
    var t = Date.now();
    video.currentTime = (t - window.birth) / 1000 % video.duration;
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
