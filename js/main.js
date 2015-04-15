function toggleDisplay(id) {
    var e = document.getElementById(id);
    if(e.style.display == "block") {
        e.style.display = "none";
    }
    else {
        e.style.display = "block";
    }
}

function toggleVisibility(id) {
    var e = document.getElementById(id);
    if(e.style.visibility == "visible") {
        e.style.visibility = "hidden";
    }
    else {
        e.style.visibility = "visible";
    }
}

function doEdit() {
    document.getElementById("walking").play();
    document.getElementById("digging").play();
    toggleVisibility("walking");
    toggleVisibility("digging");
}

Mousetrap.bind("?", function() { toggleDisplay("info"); });
Mousetrap.bind("f", function() { screenfull.toggle(); });
Mousetrap.bind("space", function() { doEdit(); });
